import { Module } from '@nestjs/common';
import { DiamondPackageService } from './diamond-package.service';
import { DiamondPackageController } from './diamond-package.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DiamondPackageController],
  providers: [DiamondPackageService, PrismaService],
})
export class DiamondPackageModule {}
