import { Request, Response } from "express";
import { organizationService } from "./organization.service";

class OrganizationController {
  getOrganizations(req: Request, res: Response) {
    return organizationService.getOrganizations();
  }

  createOrganization(req: Request, res: Response) {
    const createOrganizationDto = req.body;
    return organizationService.createOrganization(createOrganizationDto);
  }

  getOrganizationById(req: Request, res: Response) {
    return organizationService.getOrganizationById(+req.params.id);
  }

  addUserToOrganization(req: Request, res: Response) {
    let orgId = +req.params.id;
    let userId = req.body;
    return organizationService.addUserToOrganization(orgId, userId);
  }

  updateOrganizationById(req: Request, res: Response) {
    const updateOrganizationDto = req.body;
    return organizationService.updateOrganizationById(
      +req.params.id,
      updateOrganizationDto
    );
  }

  deleteOrganizationById(req: Request, res: Response) {
    return organizationService.deleteOrganizationById(+req.params.id);
  }
}

export const organizationController = new OrganizationController();
