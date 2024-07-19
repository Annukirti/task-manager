import { Request, Response, NextFunction } from "express";
import { taskService } from "./task.service";
import { AuthenticatedRequest } from "../../common/middleware/auth-middleware";
import { UserEntity } from "../user/user.entity";
import { OrganizationEntity } from "../organization/organization.entity";
import {
  ApiOperationDelete,
  ApiOperationGet,
  ApiOperationPost,
  ApiOperationPut,
  ApiPath,
} from "swagger-express-ts";

@ApiPath({
  path: "/task",
  name: "Task",
  security: { apiKeyHeader: [] },
})
class TaskController {
  @ApiOperationGet({
    path: "",
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  getTasks(req: Request, res: Response, next: NextFunction) {
    const user: UserEntity = (req as AuthenticatedRequest).user;
    const organization: OrganizationEntity = (req as AuthenticatedRequest)
      .organization;
    taskService
      .getTasks(user, organization)
      .then((result) => res.success("Tasks fetched Successfully", result))
      .catch(next);
  }

  @ApiOperationPost({
    path: "/",
    parameters: {
      body: {
        required: true,
        model: "CreateTaskDto",
      },
    },
    responses: {
      200: { description: "Success" },
      400: { description: "Parameters fail" },
    },
  })
  createTask(req: Request, res: Response, next: NextFunction) {
    const user: UserEntity = (req as AuthenticatedRequest).user;
    const organization: OrganizationEntity = (req as AuthenticatedRequest)
      .organization;
    taskService
      .createTask(req.body, user, organization)
      .then((result) => res.success("Task Created Successfully", result))
      .catch(next);
  }

  @ApiOperationGet({
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          type: "number",
        },
      },
    },
    responses: {
      200: {
        type: "String",
      },
    },
  })
  getTaskById(req: Request, res: Response, next: NextFunction) {
    taskService
      .getTaskById(+req.params.id)
      .then((result) => res.success("Task fetched Successfully", result))
      .catch(next);
  }

  @ApiOperationPut({
    description: "Update task by ID",
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          description: "ID of task to update",
          type: "number",
        },
      },
      body: {
        description: "Task Update Data",
        required: true,
        model: "UpdateTaskDto",
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  updateTaskById(req: Request, res: Response, next: NextFunction) {
    taskService
      .updateTaskById(+req.params.id, req.body)
      .then((result) => res.success("Task Updated Successfully", result))
      .catch(next);
  }

  @ApiOperationDelete({
    path: "/{id}",
    parameters: {
      path: {
        id: {
          name: "id",
          required: true,
          description: "ID of task to delete",
          type: "number",
        },
      },
    },
    responses: {
      200: {
        description: "Success",
        type: "String",
      },
    },
  })
  deleteTaskById(req: Request, res: Response, next: NextFunction) {
    taskService
      .deleteTaskById(+req.params.id)
      .then((result) => res.success("Task Deleted Successfully", result))
      .catch(next);
  }
}

export const taskController = new TaskController();
