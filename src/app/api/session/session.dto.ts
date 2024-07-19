import { IsOptional } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "SwitchOrgDto",
})
export class SwitchOrgDto {
  @IsOptional()
  @ApiModelProperty({
    description: "organizationId",
    required: true,
  })
  organizationId: number;
}
