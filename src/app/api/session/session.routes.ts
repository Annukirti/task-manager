import { Router } from "express";
import { sessionController } from "./session.controller";

const router: Router = Router();

router.get("/:userId", sessionController.getCurrentSession);

router.post("", sessionController.createSession);

router.put("/:userId/switch", sessionController.switchOrganization);

router.delete("/:userId", sessionController.deleteUserSessions);

export const sessionRoutes = router;
