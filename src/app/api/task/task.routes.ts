import { Router } from "express";
import { taskController } from "./task.controller";
import { validateDto } from "../../common/middleware/validation-middleware";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";
import { authenticate } from "../../common/middleware/auth-middleware";

const router: Router = Router();

router.get("/", authenticate, taskController.getTasks);

router.get("/:id", authenticate, taskController.getTaskById);

router.post(
  "",
  authenticate,
  validateDto(CreateTaskDto),
  taskController.createTask
);

router.put(
  "/:id",
  authenticate,
  validateDto(UpdateTaskDto),
  taskController.updateTaskById
);

router.delete("/:id", authenticate, taskController.deleteTaskById);

export const taskRoutes = router;
