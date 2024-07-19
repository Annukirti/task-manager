import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { ApiModel, ApiModelProperty } from "swagger-express-ts";

@ApiModel({
  name: "CreateOrganizationDto",
})
export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  @ApiModelProperty({
    description: "name",
    required: true,
  })
  name: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: "location",
    required: true,
  })
  location: string;
}

@ApiModel({
  name: "AddUserToOrganizationDto",
})
export class AddUserToOrganizationDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiModelProperty({
    description: "userId",
    required: true,
  })
  userId: number;
}

@ApiModel({
  name: "UpdateOrganizationDto",
})
export class UpdateOrganizationDto {
  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: "name",
    required: false,
  })
  name?: string;

  @IsString()
  @IsOptional()
  @ApiModelProperty({
    description: "location",
    required: false,
  })
  location?: string;
}
