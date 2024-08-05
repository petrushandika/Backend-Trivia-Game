import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { QuestionsService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { CreateAnswerDto } from '../answer/dto/create-answer.dto';
import { UpdateAnswerDto } from '../answer/dto/update-answer.dto';

@Controller('questions')
export class QuestionsController {
  constructor(private readonly questionsService: QuestionsService) {}

  @Post()
  create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.create(createQuestionDto);
  }

  @Get()
  findAll() {
    return this.questionsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questionsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionsService.update(+id, updateQuestionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questionsService.remove(+id);
  }

  @Post(':id/answers')
  createAnswer(@Param('id') questionId: number, @Body() createAnswerDto: CreateAnswerDto) {
    return this.questionsService.createAnswer(questionId, createAnswerDto);
  }

  @Patch('answers/:id')
  updateAnswer(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.questionsService.updateAnswer(+id, updateAnswerDto);
  }

  @Delete('answers/:id')
  removeAnswer(@Param('id') id: string) {
    return this.questionsService.removeAnswer(+id);
  }
}
