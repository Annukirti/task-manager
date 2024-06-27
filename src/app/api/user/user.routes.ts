import { Router } from "express";
import { userController } from "./user.controller";

const router: Router = Router();

router.get("/", userController.getUser);

router.get("/:id", userController.getUserById);

router.post("", userController.createUser);

router.put("/:id", userController.updateUserById);

router.delete("/:id", userController.deleteUserById);

export const userRoutes = router;
