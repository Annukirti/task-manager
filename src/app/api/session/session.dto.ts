import { IsOptional } from "class-validator";

export class SwitchOrgDto {
  @IsOptional()
  organizationId: number;
}
