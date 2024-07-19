import { Router } from "express";
import { sessionController } from "./session.controller";
import { validateDto } from "../../common/middleware/validation-middleware";
import { SwitchOrgDto } from "./session.dto";
import { authenticate } from "../../common/middleware/auth-middleware";

const router: Router = Router();

router.get("/:userId", sessionController.getCurrentSession);

router.post("", sessionController.createSession);

router.put(
  "/:userId/switch",
  authenticate,
  validateDto(SwitchOrgDto),
  sessionController.switchOrganization
);

router.delete("/:userId", sessionController.deleteUserSessions);

export const sessionRoutes = router;
