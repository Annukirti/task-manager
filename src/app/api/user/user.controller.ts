import { Request, Response } from "express";
import { userService } from "./user.service";

class UserController {
  createUser(req: Request, res: Response) {
    const result = userService.createUser(req.body);
    res.json(result);
  }

  login(req: Request, res: Response) {
    const { email, password } = req.body;
    const result = userService.login(email, password);
    res.json(result);
  }
  getUsers(req: Request, res: Response) {
    const result = userService.getUsers();
    res.json(result);
  }

  getUserById(req: Request, res: Response) {
    const result = userService.getUserById(+req.params.id);
    res.json(result);
  }

  updateUserById(req: Request, res: Response) {
    const result = userService.updateUserById(+req.params.id, req.body);
    res.json(result);
  }

  deleteUserById(req: Request, res: Response) {
    const result = userService.deleteUserById(+req.params.id);
    res.json(result);
  }
}

export const userController = new UserController();
