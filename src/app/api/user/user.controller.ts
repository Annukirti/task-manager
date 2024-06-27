import { Request, Response } from "express";
import { UserService } from "./user.service";

class UserController {
  constructor(private userService = new UserService()) {}

  createUser(req: Request, res: Response) {
    return this.userService.createUser(req.body);
  }

  login(req: Request, res: Response) {
    const { email, password } = req.body;
    return this.userService.login(email, password);
  }
  getUsers(req: Request, res: Response) {
    return this.userService.getUsers();
  }

  getUserById(req: Request, res: Response) {
    return this.userService.getUserById(+req.params.id);
  }

  updateUserById(req: Request, res: Response) {
    return this.userService.updateUserById(+req.params.id, req.body);
  }

  deleteUserById(req: Request, res: Response) {
    return this.userService.deleteUserById(+req.params.id);
  }
}

export const userController = new UserController();
