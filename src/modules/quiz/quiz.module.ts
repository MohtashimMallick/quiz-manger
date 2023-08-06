import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Questions } from './entities/questions.entity';
import { Quiz } from './entities/quiz.entity';
import { QuizController } from './controllers/quiz.controller';
import { QuizService } from './services/quiz.service';
import { QuestionController } from './controllers/questions.controller';
import { QuestionService } from './services/questions.service';
import { OptionsController } from './controllers/option.controller';
import { OptionService } from './services/option.service';
import { Option } from './entities/options.entity';
import { UserModule } from '../user/user.module';
import { ResponseController } from './controllers/response.controller';
import { ResponseService } from './services/respose.service';

@Module({
  imports: [TypeOrmModule.forFeature([Quiz, Questions, Option]), UserModule],
  controllers: [
    QuizController,
    QuestionController,
    OptionsController,
    ResponseController,
  ],
  providers: [QuizService, QuestionService, OptionService, ResponseService],
})
export class QuizModule {}
