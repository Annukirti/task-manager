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

  async getOrganizations() {
    await this.organizationRepository.find();
  }

  async getOrganizationById(id) {
    await this.organizationRepository.findBy(id);
  }

  async createOrganization(createOrganizationDto) {
    const data = {
      name: createOrganizationDto.name,
      userOrganizations: [{ userId: createOrganizationDto.userId }],
    };
    await this.organizationRepository.save(data);
  }

  async addUserToOrganization(orgId, userId) {
    await this.userOrganizationRepository.save({
      userId,
      organizationId: orgId,
    });
  }

  async updateOrganizationById(
    id: number,
    updateOrganizationDto: Partial<OrganizationEntity>
  ) {
    await this.organizationRepository.update(id, updateOrganizationDto);
  }

  async deleteOrganizationById(id: number) {
    await this.organizationRepository.delete(id);
  }
}

export const organizationService = new OrganizationService();
