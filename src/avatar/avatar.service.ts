import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AvatarService {
  constructor(private readonly prismaService: PrismaService) {}
  async findAll() {
    return await this.prismaService.avatar.findMany({});
  }

  async findOne(id: number) {
    return await this.prismaService.avatar.findFirst({
      where: {
        id,
      },
    });
  }
}
