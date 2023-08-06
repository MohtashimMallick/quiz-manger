import { ApiProperty } from '@nestjs/swagger';
import { Length, IsNotEmpty } from 'class-validator';

export class CreateQuizDto {
  @ApiProperty({
    description: 'Title of quiz',
    example: 'PHP Quiz',
  })
  @IsNotEmpty({ message: 'The Quiz should have the title' })
  @Length(3, 255)
  title: string;

  @ApiProperty({
    description: 'Quiz description',
    example: 'description',
  })
  @IsNotEmpty()
  @Length(3)
  description: string;
}
