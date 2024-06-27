import { Router } from "express";
import { userController } from "./user.controller";
import { authenticate } from "../../common/middleware/auth-middleware";

const router: Router = Router();

router.post("", userController.createUser);

router.post("", userController.login);

router.get("/", authenticate, userController.getUsers);

router.get("/:id", authenticate, userController.getUserById);

router.put("/:id", authenticate, userController.updateUserById);

router.delete("/:id", authenticate, userController.deleteUserById);

export const userRoutes = router;
