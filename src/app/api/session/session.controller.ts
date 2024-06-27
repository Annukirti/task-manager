import { Request, Response } from "express";
import { AppDataSource } from "../../database/datasource";
import { SessionEntity } from "./session.entity";
import jwt from "jsonwebtoken";
import { config } from "../../config/configuration";

class SessionController {
  constructor(
    private sessionRepository = AppDataSource.getRepository(SessionEntity)
  ) {}

  async getCurrentSession(req: Request, res: Response) {
    const session = await this.sessionRepository.findOne({
      where: { userId: +req.params.id },
    });
    res.json({ session });
  }

  async createSession(req: Request, res: Response) {
    const { userId, organizationId } = req.body;
    const token = jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresTime,
    });
    const session = new SessionEntity();
    session.user = userId;
    session.token = token;
    session.current_organization = organizationId;
    session.expires_at = new Date(Date.now() + 60 * 60 * 1000);
    await this.sessionRepository.save(session);
    res.json({ token });
  }

  async switchOrganization(req: Request, res: Response) {
    const { organizationId } = req.body;
    const session = await this.sessionRepository.findOne({
      where: { userId: +req.params.id },
    });
    if (session) {
      session.current_organization = organizationId;
      await this.sessionRepository.save(session);
      res.send("Organization switched successfully");
    } else {
      res.status(404).send("Session not found");
    }
  }

  async deleteUserSessions(req: Request, res: Response) {
    await AppDataSource.getRepository(SessionEntity).delete({
      userId: +req.params.id,
    });
    res.send("Session Deleted successfully");
  }
}

export const sessionController = new SessionController();
