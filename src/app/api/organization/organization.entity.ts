import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Organization } from "../../common/interfaces";
import { UserOrganizationEntity } from "../user/user-organization.entity";
import { TaskEntity } from "../task/task.entity";

@Entity({ name: "organization" })
export class OrganizationEntity implements Organization {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => UserOrganizationEntity, (userOrg) => userOrg.organization)
  userOrganizations: UserOrganizationEntity[];

  @OneToMany(() => TaskEntity, (task) => task.organization)
  tasks: TaskEntity[];
}
