import { Router } from "express";
import { organizationController } from "./organization.controller";
import { validateDto } from "../../common/middleware/validation-middleware";
import {
  AddUserToOrganizationDto,
  CreateOrganizationDto,
  UpdateOrganizationDto,
} from "./organization.dto";

const router: Router = Router();

router.get("/", organizationController.getOrganizations);

router.get("/:id", organizationController.getOrganizationById);

router.post(
  "",
  validateDto(CreateOrganizationDto),
  organizationController.createOrganization
);

router.post(
  "/:id",
  validateDto(AddUserToOrganizationDto),
  organizationController.addUserToOrganization
);

router.put(
  "/:id",
  validateDto(UpdateOrganizationDto),
  organizationController.updateOrganizationById
);

router.delete("/:id", organizationController.deleteOrganizationById);

export const organizationRoutes = router;
