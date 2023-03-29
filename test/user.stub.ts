import { User } from '../src/user/schemas/user.schema';

export const userStub = (): User => {
  return {
    name: 'Juana',
    surname: 'Cupcake',
    password: '1234',
    email: 'juanacupcake@gmail.com',
    city: 'Barcelona',
    progress: [false, false, false],
    openQuestion: 'Espero aprender mucho',
  };
};
