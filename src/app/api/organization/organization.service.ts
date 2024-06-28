import { Role } from "../../common";
import { ResponseError } from "../../common/utils/error.utils";
import { AppDataSource } from "../../database/datasource";
import { UserOrganizationEntity } from "../user/user-organization.entity";
import { UserEntity } from "../user/user.entity";
import { OrganizationEntity } from "./organization.entity";

class OrganizationService {
  constructor(
    private organizationRepository = AppDataSource.getRepository(
      OrganizationEntity
    ),
    private userOrganizationRepository = AppDataSource.getRepository(
      UserOrganizationEntity
    )
  ) {}

  async getOrganizations(user: UserEntity) {
    return await this.userOrganizationRepository.find({
      where: { user },
      relations: { organization: true },
    });
  }

  async getOrganizationById(id: number) {
    return await this.organizationRepository.findBy({ id });
  }

  async createOrganization(createOrganizationDto, user: UserEntity) {
    const data = {
      name: createOrganizationDto.name,
      location: createOrganizationDto.location,
      userOrganizations: [{ role: Role.ADMIN, user: user }],
    };
    return await this.organizationRepository.save(data);
  }

  async addUserToOrganization(
    orgId: number,
    user: UserEntity,
    userToAdd: number
  ) {
    const userOrganization = user.userOrganizations.find(
      (org) => org.organizationId === orgId
    );

    if (userOrganization.role !== Role.ADMIN) {
      return Promise.reject(new ResponseError(401, "Unauthorized", 4011));
    }
    return await this.userOrganizationRepository.save({
      userId: userToAdd,
      organizationId: orgId,
    });
  }

  async updateOrganizationById(
    user: UserEntity,
    orgId: number,
    updateOrganizationDto: Partial<OrganizationEntity>
  ) {
    const userOrganization = user.userOrganizations.find(
      (org) => org.organizationId === orgId
    );

    if (userOrganization.role !== Role.ADMIN) {
      return Promise.reject(new ResponseError(401, "Unauthorized", 4011));
    }

    return await this.organizationRepository.update(
      { id: orgId },
      updateOrganizationDto
    );
  }

  async deleteOrganizationById(id: number, user: UserEntity) {
    const userOrganization = user.userOrganizations.find(
      (org) => org.organizationId === id
    );

    if (userOrganization.role !== Role.ADMIN) {
      return Promise.reject(new ResponseError(401, "Unauthorized", 4011));
    }

    return await this.organizationRepository.delete(id);
  }
}

export const organizationService = new OrganizationService();
