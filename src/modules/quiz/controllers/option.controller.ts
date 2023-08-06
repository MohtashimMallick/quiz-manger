import {
  Controller,
  Post,
  Body,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateOptionDto } from '../dto/create-option.dto';
import { OptionService } from '../services/option.service';
import { QuestionService } from '../services/questions.service';

@ApiTags('Question')
@Controller('question/option')
export class OptionsController {
  constructor(
    private questionService: QuestionService,
    private optionService: OptionService,
  ) {}

  @Post()
  @UsePipes(ValidationPipe)
  async saveOptionToQuestion(@Body() createOptionData: CreateOptionDto) {
    const question = await this.questionService.findQuestionById(
      createOptionData.questionId,
    );
    const option = await this.optionService.createOption(
      createOptionData,
      question,
    );
    return { question, createOptionData, option };
  }
}
