import { Router } from "express";
import { taskController } from "./task.controller";
import { validateDto } from "../../common/middleware/validation-middleware";
import { CreateTaskDto, UpdateTaskDto } from "./task.dto";

const router: Router = Router();

router.get("/", taskController.getTasks);

router.get("/:id", taskController.getTaskById);

router.post("", validateDto(CreateTaskDto), taskController.createTask);

router.put("/:id", validateDto(UpdateTaskDto), taskController.updateTaskById);

router.delete("/:id", taskController.deleteTaskById);

export const taskRoutes = router;
