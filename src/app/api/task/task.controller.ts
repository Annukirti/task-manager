import { Request, Response } from "express";

class TaskController {
  getUser(req: Request, res: Response) {
    res.send("Hello, I am a GET user API!");
  }

  createUser(req: Request, res: Response) {
    res.send("Hello, I am a POST user API!");
  }

  getUserById(req: Request, res: Response) {
    res.send("Hello, I am a GET user BY ID API!");
  }

  updateUserById(req: Request, res: Response) {
    res.send("Hello, I am a UPDATE user API!");
  }

  deleteUserById(req: Request, res: Response) {
    res.send("Hello, I am a DELETE user API!");
  }
}

export const taskController = new TaskController();
