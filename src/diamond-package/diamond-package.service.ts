import { Injectable } from '@nestjs/common';
import { CreateDiamondPackageDto } from './dto/create-diamond-package.dto';
import { UpdateDiamondPackageDto } from './dto/update-diamond-package.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class DiamondPackageService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDiamondPackageDto: CreateDiamondPackageDto) {
    const diamondPackage = await this.prismaService.diamondPackage.create({
      data: {
        ...createDiamondPackageDto,
      },
    });

    return diamondPackage;
  }

  async findAll() {
    return await this.prismaService.diamondPackage.findMany({});
  }

  async findOne(id: number) {
    return await this.prismaService.diamondPackage.findFirst({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateDiamondPackageDto: UpdateDiamondPackageDto) {
    return await this.prismaService.diamondPackage.update({
      where: {
        id,
      },
      data: {
        ...updateDiamondPackageDto,
      },
    });
  }
}
