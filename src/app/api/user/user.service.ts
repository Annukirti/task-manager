import { AppDataSource } from "../../database/datasource";
import bcrypt from "bcryptjs";
import { UserEntity } from "./user.entity";
import { User } from "../../common";
import { SessionService } from "../session/session.service";

export class UserService {
  constructor(
    private userRepository = AppDataSource.getRepository(UserEntity),
    private sessionService = new SessionService()
  ) {}

  async createUser(userDto: User) {
    const userExist = await this.userRepository.findOne({
      where: { email: userDto.email },
    });
    if (userExist) {
      throw new Error("User already exists.");
    }
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.userRepository.save({
      ...userDto,
      password: hashedPassword,
    });
    return this.sessionService.createSession(user.id);
  }

  async login(email: string, password: string) {
    const user = await this.userRepository.findOne({ where: { email } });
    if (user && (await bcrypt.compare(password, user.password))) {
      return this.sessionService.createSession(user.id);
    } else {
      throw new Error("Invalid credentials");
    }
  }

  async getUsers() {
    return await this.userRepository.find({});
  }

  async getUserById(id: number) {
    return await this.userRepository.findBy({ id });
  }

  async updateUserById(id: number, updateUserDto: Partial<User>) {
    return await this.userRepository.update({ id }, updateUserDto);
  }

  async deleteUserById(id: number) {
    return await this.userRepository.delete({ id });
  }
}
