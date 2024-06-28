import { AppDataSource } from "../../database/datasource";
import bcrypt from "bcryptjs";
import { UserEntity } from "./user.entity";
import { User } from "../../common";
import { sessionService } from "../session/session.service";
import { ResponseError } from "../../common/utils/error.utils";
import { CreateUserDto, LoginDto, UpdateUserDto } from "./user.dto";

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

  async getUsers() {
    return await this.userRepository.find({});
  }

  async getUserById(id: number) {
    return await this.userRepository.findBy({ id });
  }

  async updateUserById(id: number, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ id }, updateUserDto);
  }

  async deleteUserById(id: number) {
    return await this.userRepository.delete({ id });
  }
}

export const userService = new UserService();
