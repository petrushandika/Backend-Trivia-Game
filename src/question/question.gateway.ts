import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';
import { QuestionsService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@WebSocketGateway()
export class QuestionsGateway {
  @WebSocketServer()
  server: Server;

  constructor(private readonly questionsService: QuestionsService) {}

  @SubscribeMessage('createQuestion')
  async handleCreateQuestion(@MessageBody() createQuestionDto: CreateQuestionDto) {
    const question = await this.questionsService.create(createQuestionDto);
    this.server.emit('questionCreated', question);
  }

  @SubscribeMessage('updateQuestion')
  async handleUpdateQuestion(@MessageBody() data: { id: number; updateQuestionDto: UpdateQuestionDto }) {
    const { id, updateQuestionDto } = data;
    const question = await this.questionsService.update(id, updateQuestionDto);
    this.server.emit('questionUpdated', question);
  }

  @SubscribeMessage('deleteQuestion')
  async handleDeleteQuestion(@MessageBody() id: number) {
    await this.questionsService.remove(id);
    this.server.emit('questionDeleted', id);
  }

  @SubscribeMessage('getAllQuestions')
  async handleGetAllQuestions() {
    const questions = await this.questionsService.findAll();
    this.server.emit('allQuestions', questions);
  }
}
