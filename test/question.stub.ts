import { CreateQuestionDto } from 'src/question/dto/create-question.dto';

export const questionStub = (): CreateQuestionDto => {
  return {
    question: '¿Cómo hay que conectarse a la clase?',
    answer: [
      { text: 'Con la cámara encendida y el micro apagado', isCorrect: true },
    ],
    type: 'Opción múltiple',
    section: 'Sección normas',
    feedbackCorrect:
      'Nos queremos ver las caras entre todas y fomentar la participación',
    feedbackIncorrect: 'Incorrecto - vuelve a intentarlo'
  };
};
