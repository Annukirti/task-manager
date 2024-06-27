import { Request, Response } from "express";
import { SessionService } from "./session.service";

class SessionController {
  constructor(private sessionService = new SessionService()) {}

  async getCurrentSession(req: Request, res: Response) {
    const userId = +req.params.id;
    const session = this.sessionService.getCurrentSession(userId);
    res.json({ session });
  }

  async createSession(req: Request, res: Response) {
    const { userId, organizationId } = req.body;
    return await this.sessionService.createSession(userId, organizationId);
  }

  async switchOrganization(req: Request, res: Response) {
    const { organizationId } = req.body;
    const userId = +req.params.id;
    return await this.sessionService.switchOrganization(userId, organizationId);
  }

  async deleteUserSessions(req: Request, res: Response) {
    const userId = +req.params.id;
    return await this.sessionService.deleteUserSessions(userId);
  }
}

export const sessionController = new SessionController();
