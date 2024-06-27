import { NextFunction, Request, Response } from "express";
import { userService } from "./user.service";

class UserController {
  createUser(req: Request, res: Response, next: NextFunction) {
    userService
      .createUser(req.body)
      .then((result) => res.success("User Created Successfully", result))
      .catch(next);
  }

  login(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    userService
      .login(email, password)
      .then((result) => res.success("Logged in Successfully", result))
      .catch(next);
  }

  getUsers(req: Request, res: Response, next: NextFunction) {
    userService
      .getUsers()
      .then((result) => res.success("Users fetched Successfully", result))
      .catch(next);
  }

  getUserById(req: Request, res: Response, next: NextFunction) {
    userService
      .getUserById(+req.params.id)
      .then((result) => res.success("User fetched Successfully", result))
      .catch(next);
  }

  updateUserById(req: Request, res: Response, next: NextFunction) {
    userService
      .updateUserById(+req.params.id, req.body)
      .then((result) => res.success("User updated Successfully", result))
      .catch(next);
  }

  deleteUserById(req: Request, res: Response, next: NextFunction) {
    userService
      .deleteUserById(+req.params.id)
      .then((result) => res.success("User deleted Successfully", result))
      .catch(next);
  }
}

export const userController = new UserController();
