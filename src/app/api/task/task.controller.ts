import { Request, Response, NextFunction } from "express";
import { taskService } from "./task.service";

class TaskController {
  getTasks(req: Request, res: Response, next: NextFunction) {
    taskService
      .getTasks()
      .then((result) => res.success("Tasks fetched Successfully", result))
      .catch(next);
  }

  createTask(req: Request, res: Response, next: NextFunction) {
    taskService
      .createTask(req.body)
      .then((result) => res.success("Task Created Successfully", result))
      .catch(next);
  }

  getTaskById(req: Request, res: Response, next: NextFunction) {
    taskService
      .getTaskById(+req.params.id)
      .then((result) => res.success("Task fetched Successfully", result))
      .catch(next);
  }

  updateTaskById(req: Request, res: Response, next: NextFunction) {
    taskService
      .updateTaskById(+req.params.id, req.body)
      .then((result) => res.success("Task Updated Successfully", result))
      .catch(next);
  }

  deleteTaskById(req: Request, res: Response, next: NextFunction) {
    taskService
      .deleteTaskById(+req.params.id)
      .then((result) => res.success("Task Deleted Successfully", result))
      .catch(next);
  }
}

export const taskController = new TaskController();
