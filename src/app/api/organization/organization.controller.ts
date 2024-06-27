import { Request, Response } from "express";
import { OrganizationService } from "./organization.service";

class OrganizationController {
  constructor(private organizationService = new OrganizationService()) {}

  getOrganizations(req: Request, res: Response) {
    return this.organizationService.getOrganizations();
  }

  createOrganization(req: Request, res: Response) {
    const createOrganizationDto = req.body;
    return this.organizationService.createOrganization(createOrganizationDto);
  }

  getOrganizationById(req: Request, res: Response) {
    return this.organizationService.getOrganizationById(+req.params.id);
  }

  addUserToOrganization(req: Request, res: Response) {
    let orgId = +req.params.id;
    let userId = req.body;
    return this.organizationService.addUserToOrganization(orgId, userId);
  }

  updateOrganizationById(req: Request, res: Response) {
    const updateOrganizationDto = req.body;
    return this.organizationService.updateOrganizationById(
      +req.params.id,
      updateOrganizationDto
    );
  }

  deleteOrganizationById(req: Request, res: Response) {
    return this.organizationService.deleteOrganizationById(+req.params.id);
  }
}

export const organizationController = new OrganizationController();
