import { AppDataSource } from "../../database/datasource";
import bcrypt from "bcryptjs";
import { UserEntity } from "./user.entity";
import { sessionService } from "../session/session.service";
import { ResponseError } from "../../common/utils/error.utils";
import {
  CreateUserDto,
  ForgotPasswordDto,
  LoginDto,
  ResetPasswordDto,
  ChangePasswordDto,
  UpdateUserDto,
} from "./user.dto";
import { Request } from "express";
import { AuthenticatedRequest } from "../../common";
import jwt from "jsonwebtoken";
import { config } from "../../config/configuration";
import {
  registerHandlebars,
  sendEmail,
} from "../../common/email/email.service";
import { UserNotificationEvents } from "./user.notification.events";
import { transformUser } from "../../common/utils/response.utils";

class UserService {
  constructor(
    private userRepository = AppDataSource.getRepository(UserEntity)
  ) {}

  async createUser(userDto: CreateUserDto) {
    const userExist = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (userExist) {
      return Promise.reject(
        new ResponseError(401, "User already exists", 4011)
      );
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userRepository.save({
      ...userDto,
      password: hashedPassword,
    });
    return sessionService.createSession(user.id);
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      sessionService.deleteUserSessions(user.id);
      return sessionService.createSession(user.id);
    } else {
      return Promise.reject(
        new ResponseError(401, "Invalid credentials", 4011)
      );
    }
  }

  async logout(req: Request) {
    const user = (req as AuthenticatedRequest).user;
    return await sessionService.deleteUserSessions(user.id);
  }

  async getUsers() {
    const users = await this.userRepository.find({});
    const transformedUsers = transformUser(users, UserEntity);
    return transformedUsers;
  }

  async getUserById(id: number) {
    const user = await this.userRepository.findBy({ id });
    const transformedUsers = transformUser(user, UserEntity);
    return transformedUsers;
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ id }, updateUserDto);
  }

  async deleteUserById(id: number) {
    await sessionService.deleteUserSessions(id);
    return await this.userRepository.delete({ id });
  }

  async forgotPassword(forgotPasswordDto: ForgotPasswordDto): Promise<void> {
    const { email } = forgotPasswordDto;
    const user = await this.userRepository.findOne({ where: { email } });
    if (!user) {
      return Promise.reject(new ResponseError(400, "User Not Found."));
    }
    await sessionService.deleteUserSessions(user.id);
    const token = await sessionService.createSession(user.id);
    await sendEmail({
      to: email,
      subject: "Reset Password Request",
      html: registerHandlebars(
        UserNotificationEvents.USER_FORGOT_PASSWORD,
        token
      ),
    });
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { token, newPassword } = resetPasswordDto;
    const decoded = jwt.verify(token, config.jwt.secret) as any;
    if (!decoded) {
      return Promise.reject(
        new ResponseError(400, "Invalid or expired token", 4001)
      );
    }
    const user = await this.userRepository.findOne({
      where: { id: decoded.userId },
    });
    if (!user) {
      return Promise.reject(new ResponseError(400, "User Not Found."));
    }
    const tokenExist = await sessionService.getSessionByToken(token);
    if (!tokenExist) {
      return Promise.reject(new ResponseError(400, "Unauthorized."));
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.updateUserById(user.id, { password: hashedPassword });
    await sessionService.deleteUserSessions(user.id);
    await sendEmail({
      to: user.email,
      subject: "Reset Password Succeeded",
      html: registerHandlebars(UserNotificationEvents.USER_PASSWORD_RESET),
    });
  }

  async changePassword(
    user: UserEntity,
    updatePasswordDto: ChangePasswordDto
  ): Promise<void> {
    const { currentPassword, newPassword } = updatePasswordDto;
    if (currentPassword !== newPassword) {
      const checkPassword = await bcrypt.compare(
        currentPassword,
        user.password
      );
      if (checkPassword) {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.userRepository.update(
          { id: user.id },
          { password: hashedPassword }
        );
        await sessionService.deleteUserSessions(user.id);
        await sendEmail({
          to: user.email,
          subject: "Password Changed Succeeded",
          html: registerHandlebars(
            UserNotificationEvents.USER_PASSWORD_CHANGED
          ),
        });
      } else {
        return Promise.reject(
          new ResponseError(
            400,
            "Current Password doesn't match the old Password",
            4001
          )
        );
      }
    } else {
      return Promise.reject(
        new ResponseError(
          400,
          "Current Password can't be same with the new Password",
          4001
        )
      );
    }
  }
}

export const userService = new UserService();
