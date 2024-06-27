import { Router } from "express";
import { taskController } from "./task.controller";

const router: Router = Router();

router.get("/", taskController.getTasks);

router.get("/:id", taskController.getTaskById);

router.post("", taskController.createTask);

router.put("/:id", taskController.updateTaskById);

router.delete("/:id", taskController.deleteTaskById);

export const taskRoutes = router;
