import { Request, Response } from "express";
import { TaskService } from "./task.service";

class TaskController {
  constructor(private taskService = new TaskService()) {}

  getTasks(req: Request, res: Response) {
    return this.taskService.getTasks();
  }

  createTask(req: Request, res: Response) {
    return this.taskService.createTask(req.body);
  }

  getTaskById(req: Request, res: Response) {
    return this.taskService.getTaskById(+req.params.id);
  }

  updateTaskById(req: Request, res: Response) {
    return this.taskService.updateTaskById(+req.params.id, req.body);
  }

  deleteTaskById(req: Request, res: Response) {
    return this.taskService.deleteTaskById(+req.params.id);
  }
}

export const taskController = new TaskController();
