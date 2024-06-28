import { Request, Response, NextFunction } from "express";
import { taskService } from "./task.service";
import { AuthenticatedRequest } from "../../common/middleware/auth-middleware";
import { UserEntity } from "../user/user.entity";
import { OrganizationEntity } from "../organization/organization.entity";
import { CreateTaskDto } from "./task.dto";

class TaskController {
  getTasks(req: Request, res: Response, next: NextFunction) {
    const user: UserEntity = (req as AuthenticatedRequest).user;
    const organization: OrganizationEntity = (req as AuthenticatedRequest)
      .organization;
    taskService
      .getTasks(user, organization)
      .then((result) => res.success("Tasks fetched Successfully", result))
      .catch(next);
  }

  createTask(req: Request, res: Response, next: NextFunction) {
    const user: UserEntity = (req as AuthenticatedRequest).user;
    const organization: OrganizationEntity = (req as AuthenticatedRequest)
      .organization;
    taskService
      .createTask(req.body, user, organization)
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
