import {
  Controller,
  Get,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { Query, UseGuards } from '@nestjs/common/decorators';
import { DefaultValuePipe } from '@nestjs/common/pipes';
import {
  ApiCreatedResponse,
  ApiOkResponse,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { app } from 'src/constants/app.constant';
import { jwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';
import { Roles } from 'src/modules/auth/roles.decorator';
import { RoleGuard } from 'src/modules/auth/roles.guard';
import { ApiPaginationResponse } from 'src/utils/decorators/api-pagination.response';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';
import { Quiz } from '../entities/quiz.entity';
import { QuizService } from '../services/quiz.service';

@ApiTags('Quiz')
@Controller('quiz')
@ApiSecurity('bearer')
@UseGuards(jwtAuthGuard)
export class QuizController {
  constructor(private quizService: QuizService) {}
  @Get('/')
  @ApiPaginationResponse({ model: Quiz, description: 'List of Quizes' })
  async getAllQuiz(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page = 1,
    @Query('limit', new DefaultValuePipe(1), ParseIntPipe) limit = 1,
  ): Promise<Pagination<Quiz>> {
    // return this.quizService.getAllQuiz();
    const options: IPaginationOptions = {
      limit,
      page,
    };
    return await this.quizService.paginate(options);
  }

  @Get('/:id')
  @ApiOkResponse()
  async getQuizById(@Param('id', ParseIntPipe) id: number) {
    return await this.quizService.getQuizById(id);
  }

  @ApiCreatedResponse({ description: 'The quiz that got created', type: Quiz })
  @Post()
  @UsePipes(ValidationPipe)
  @UseGuards(RoleGuard)
  @Roles(app.Roles.ADMIN)
  async createQuiz(@Body() quizData: CreateQuizDto) {
    return await this.quizService.creatNewQuiz(quizData);
  }
}
