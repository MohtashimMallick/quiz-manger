import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Pagination,
  IPaginationOptions,
  paginate,
} from 'nestjs-typeorm-paginate';
import { Repository } from 'typeorm';
import { CreateQuizDto } from '../dto/CreateQuiz.dto';
import { Quiz } from '../entities/quiz.entity';

@Injectable()
export class QuizService {
  constructor(
    @InjectRepository(Quiz) private quizRepository: Repository<Quiz>,
  ) {}
  async getAllQuiz() {
    // *********************** This is a Deprecated method ***********************
    return await this.quizRepository.find({
      relations: ['questions', 'questions.options'],
    });

    // *********************** This is a new method with using find funtion ***********************
    // return await this.quizRepository.find({
    //   relations: {
    //     questions: {
    //       options: true,
    //     },
    //   },
    // });

    // *********************** This is a Query Builder method ***********************
    // return this.quizRepository
    //   .createQueryBuilder('q')
    //   .leftJoinAndSelect('q.questions', 'qt')
    //   .leftJoinAndSelect('qt.options', 'o')
    //   .getMany();
  }
  async getQuizById(id: any): Promise<Quiz> {
    return await this.quizRepository.findOne({
      where: {
        id,
      },
      relations: ['questions'],
    });
  }

  async paginate(options: IPaginationOptions): Promise<Pagination<Quiz>> {
    const qb = this.quizRepository.createQueryBuilder('q');
    qb.orderBy('q.id', 'DESC');
    return paginate<Quiz>(qb, options);
  }
  async creatNewQuiz(quizData: CreateQuizDto) {
    return await this.quizRepository.save(quizData);
  }
}
