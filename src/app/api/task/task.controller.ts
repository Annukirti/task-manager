import { Request, Response } from "express";
import { taskService } from "./task.service";

class TaskController {
  getTasks(req: Request, res: Response) {
    return taskService.getTasks();
  }

  createTask(req: Request, res: Response) {
    return taskService.createTask(req.body);
  }

  getTaskById(req: Request, res: Response) {
    return taskService.getTaskById(+req.params.id);
  }

  updateTaskById(req: Request, res: Response) {
    return taskService.updateTaskById(+req.params.id, req.body);
  }

  deleteTaskById(req: Request, res: Response) {
    return taskService.deleteTaskById(+req.params.id);
  }
}

export const taskController = new TaskController();
