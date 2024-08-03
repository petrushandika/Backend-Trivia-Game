import { Injectable } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class QuestionService {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createQuestionDto: CreateQuestionDto) {
    return await this.prismaService.question.create({
      data: createQuestionDto,
    });
  }

  async findAll() {
    return await this.prismaService.question.findMany({});
  }

  async findOne(id: number) {
    return await this.prismaService.question.findFirst({
      where: {
        id,
      },
    });
  }
}
