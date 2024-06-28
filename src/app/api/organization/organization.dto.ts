import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateOrganizationDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  location: string;
}

export class AddUserToOrganizationDto {
  @IsNumber()
  @IsNotEmpty()
  userId: number;
}

export class UpdateOrganizationDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  location?: string;
}
