import { Router } from "express";
import { organizationController } from "./organization.controller";

const router: Router = Router();

router.get("/", organizationController.getUser);

router.get("/:id", organizationController.getUserById);

router.post("", organizationController.createUser);

router.put("/:id", organizationController.updateUserById);

router.delete("/:id", organizationController.deleteUserById);

export const organizationRoutes = router;
