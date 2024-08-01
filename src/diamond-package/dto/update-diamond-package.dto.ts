import { PartialType } from '@nestjs/mapped-types';
import { CreateDiamondPackageDto } from './create-diamond-package.dto';

export class UpdateDiamondPackageDto extends PartialType(
  CreateDiamondPackageDto,
) {}
