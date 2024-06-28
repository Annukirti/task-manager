import { Entity, Column, OneToMany } from "typeorm";
import { Organization } from "../../common/interfaces";
import { UserOrganizationEntity } from "../user/user-organization.entity";
import { TaskEntity } from "../task/task.entity";
import { CoreEntity } from "../core.entity";

@Entity({ name: "organization" })
export class OrganizationEntity extends CoreEntity implements Organization {
  @Column({ name: "name", type: "varchar", unique: true, nullable: false })
  name: string;

  @Column({ name: "location", type: "varchar", nullable: true })
  location: string;

  @OneToMany(() => UserOrganizationEntity, (userOrg) => userOrg.organization, {
    cascade: true,
  })
  userOrganizations: UserOrganizationEntity[];

  @OneToMany(() => TaskEntity, (task) => task.organization)
  tasks: TaskEntity[];
}
