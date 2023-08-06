import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from '../dto/create-question.dto';
import { Questions } from '../entities/questions.entity';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Questions)
    private questionRepository: Repository<Questions>,
  ) {}

  async findQuestionById(id: number): Promise<Questions> {
    return await this.questionRepository.findOne({
      where: {
        id,
      },
      relations: ['quiz', 'options'],
    });
  }

  async creatNewQuestion(question: CreateQuestionDto, quiz: Quiz) {
    const newQuestion = await this.questionRepository.save({
      question: question.question,
    });
    console.log({ question, quiz, newQuestion });

    quiz.questions = [newQuestion, ...quiz.questions];
    await quiz.save();
    return newQuestion;
  }
}
