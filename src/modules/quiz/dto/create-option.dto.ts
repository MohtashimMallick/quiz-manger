import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty } from 'class-validator';

export class CreateOptionDto {
  @ApiProperty({
    description: 'The text of the option',
    example: 'PHP',
  })
  @IsNotEmpty()
  @Length(3)
  text: string;

  @ApiProperty({
    description: 'Question id where the option listing',
    example: '1',
  })
  @IsNotEmpty()
  questionId: number;

  @ApiProperty({
    description: 'Option is correct?',
    example: true,
  })
  @IsNotEmpty()
  isCorrect: boolean;
}
