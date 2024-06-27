import { Request, Response } from "express";
import { sessionService } from "./session.service";

class SessionController {
  async getCurrentSession(req: Request, res: Response) {
    const userId = +req.params.id;
    const session = sessionService.getCurrentSession(userId);
    res.json({ session });
  }

  async createSession(req: Request, res: Response) {
    const { userId, organizationId } = req.body;
    return await sessionService.createSession(userId, organizationId);
  }

  async switchOrganization(req: Request, res: Response) {
    const { organizationId } = req.body;
    const userId = +req.params.id;
    return await sessionService.switchOrganization(userId, organizationId);
  }

  async deleteUserSessions(req: Request, res: Response) {
    const userId = +req.params.id;
    return await sessionService.deleteUserSessions(userId);
  }
}

export const sessionController = new SessionController();
