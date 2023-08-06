import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { QuestionService } from '../services/questions.service';
import { QuizService } from '../services/quiz.service';

@ApiTags('Question')
@Controller('question')
export class QuestionController {
  constructor(
    private questionService: QuestionService,
    private quizService: QuizService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createQuestion(@Body() questionData: CreateQuestionDto) {
    const quiz = await this.quizService.getQuizById(questionData.quizId);
    return await this.questionService.creatNewQuestion(questionData, quiz);
  }
}
