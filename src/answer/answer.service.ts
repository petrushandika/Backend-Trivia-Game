import { Injectable } from '@nestjs/common';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class AnswerService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createAnswerDto: CreateAnswerDto) {
    return await this.prismaService.answer.create({
      data: createAnswerDto,
    });
  }

  async findAll() {
    return await this.prismaService.answer.findMany({});
  }

  async findOne(id: number) {
    return await this.prismaService.answer.findFirst({
      where: {
        id,
      },
    });
  }
}
