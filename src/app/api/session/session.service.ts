import { AppDataSource } from "../../database/datasource";
import { SessionEntity } from "./session.entity";
import jwt from "jsonwebtoken";
import { config } from "../../config/configuration";
import { ResponseError } from "../../common/utils/error.utils";
import { SwitchOrgDto } from "./session.dto";

class SessionService {
  constructor(
    private sessionRepository = AppDataSource.getRepository(SessionEntity)
  ) {}

  async getCurrentSession(userId: number) {
    const session = await this.sessionRepository.findOne({
      where: { userId: +userId },
    });
    return session;
  }

  async getSessionByToken(token: string) {
    const session = await this.sessionRepository.findOne({
      where: { token },
    });
    return session;
  }

  async createSession(userId: number, organizationId?: number) {
    const token = jwt.sign({ userId }, config.jwt.secret, {
      expiresIn: config.jwt.expiresTime,
    });
    const session = new SessionEntity();
    session.userId = userId;
    session.token = token;
    session.currentOrganizationId = organizationId || null;
    session.expiresAt = new Date(Date.now() + 60 * 60 * 1000);
    await this.sessionRepository.save(session);
    return { token };
  }

  async switchOrganization(userId: number, switchOrgDto: SwitchOrgDto) {
    const session = await this.sessionRepository.findOne({
      where: { userId },
    });
    if (session && session.expiresAt > new Date(Date.now())) {
      session.currentOrganizationId = switchOrgDto.organizationId;
      await this.sessionRepository.save(session);
      return "Organization switched successfully";
    } else {
      return Promise.reject(new ResponseError(401, "Session not found", 4011));
    }
  }

  async deleteUserSessions(userId: number) {
    await this.sessionRepository.delete({
      userId,
    });
    return "Session Deleted successfully";
  }
}

export const sessionService = new SessionService();
