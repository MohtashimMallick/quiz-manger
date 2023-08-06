import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty } from 'class-validator';

export class CreateQuestionDto {
  @ApiProperty({
    description: 'Text of question',
    example: 'In which programing language where we are using this syntex?',
  })
  @IsNotEmpty()
  @Length(3)
  question: string;

  @ApiProperty({
    description: 'Quiz id of question',
    example: '2',
  })
  @IsNotEmpty()
  quizId: number;
}
