import { ApiProperty } from '@nestjs/swagger';

export class CreateQuestionDto {
  @ApiProperty({ example: '¿Cómo hay que conectarse a la clase?' })
  question: string;

  @ApiProperty({ example: [{text:'Con la cámara encendida y el micro apagado', isCorrect: true}, {text:'Es indiferente', isCorrect: false}] })
  answer: [{
    text: string, 
    isCorrect: boolean
  }];

  @ApiProperty({ example: 'Opción múltiple' })
  type: string;

  @ApiProperty({ example: 'Sección normas' })
  section: string;

  @ApiProperty({ example: 'Nos queremos ver las caras entre todas y fomentar la participación' })
  feedbackCorrect: string;

  @ApiProperty({ example: 'Incorrecto - vuelve a intentarlo' })
  feedbackIncorrect: string;
}