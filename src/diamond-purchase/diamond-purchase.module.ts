import { Module } from '@nestjs/common';
import { DiamondPurchaseService } from './diamond-purchase.service';
import { DiamondPurchaseController } from './diamond-purchase.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  controllers: [DiamondPurchaseController],
  providers: [DiamondPurchaseService, PrismaService],
})
export class DiamondPurchaseModule {}
