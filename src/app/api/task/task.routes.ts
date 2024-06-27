import { Router } from "express";
import { taskController } from "./task.controller";

const router: Router = Router();

router.get("/", taskController.getUser);

router.get("/:id", taskController.getUserById);

router.post("", taskController.createUser);

router.put("/:id", taskController.updateUserById);

router.delete("/:id", taskController.deleteUserById);

export const taskRoutes = router;
