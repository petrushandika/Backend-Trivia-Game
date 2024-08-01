import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDiamondPurchaseDto } from './dto/create-diamond-purchase.dto';
import { UpdateDiamondPurchaseDto } from './dto/update-diamond-purchase.dto';

@Injectable()
export class DiamondPurchaseService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createDiamondPurchaseDto: CreateDiamondPurchaseDto) {
    try {
      const diamondPurchase = await this.prismaService.diamondPurchase.create({
        data: {
          ...createDiamondPurchaseDto,
        },
      });
      return diamondPurchase;
    } catch (error) {
      throw new Error(`Error creating diamond purchase: ${error.message}`);
    }
  }

  async findAll() {
    try {
      return await this.prismaService.diamondPurchase.findMany();
    } catch (error) {
      throw new Error(`Error fetching diamond purchases: ${error.message}`);
    }
  }

  async findOne(id: number) {
    try {
      const diamondPurchase =
        await this.prismaService.diamondPurchase.findUnique({
          where: { id },
        });

      if (!diamondPurchase) {
        throw new NotFoundException(`DiamondPurchase with ID ${id} not found`);
      }

      return diamondPurchase;
    } catch (error) {
      throw new Error(`Error fetching diamond purchase: ${error.message}`);
    }
  }

  async update(id: number, updateDiamondPurchaseDto: UpdateDiamondPurchaseDto) {
    try {
      const diamondPurchase = await this.prismaService.diamondPurchase.update({
        where: { id },
        data: {
          ...updateDiamondPurchaseDto,
        },
      });

      if (!diamondPurchase) {
        throw new NotFoundException(`DiamondPurchase with ID ${id} not found`);
      }

      return diamondPurchase;
    } catch (error) {
      throw new Error(`Error updating diamond purchase: ${error.message}`);
    }
  }

  async delete(id: number) {
    try {
      const diamondPurchase = await this.prismaService.diamondPurchase.delete({
        where: { id },
      });

      if (!diamondPurchase) {
        throw new NotFoundException(`DiamondPurchase with ID ${id} not found`);
      }

      return diamondPurchase;
    } catch (error) {
      throw new Error(`Error deleting diamond purchase: ${error.message}`);
    }
  }
}
