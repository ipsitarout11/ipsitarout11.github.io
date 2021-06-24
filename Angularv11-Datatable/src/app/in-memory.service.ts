import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryService implements InMemoryDbService {
  createDb() {
    const sample = [
        {
        "id":1,
        "FirstName":"Nelson",
        "LastName":"Dez",
        "Email":"nelson@gmail.com",
        "Address":"IN"
        },
        {
        "id":2,
        "FirstName":"Tassel",
        "LastName":"Ro",
        "Email":"ro@gmail.com",
        "Address":"EU"
        },
        {
        "id":3,
        "FirstName":"Andrew",
        "LastName":"Tc",
        "Email":"tc@gmail.com",
        "Address":"UK"
        },
        {
        "id":4,
        "FirstName":"Den",
        "LastName":"Roy",
        "Email":"den@gmail.com",
        "Address":"GE"
        },
        {
        "id":5,
        "FirstName":"Fiz",
        "LastName":"Ijo",
        "Email":"fiz@gmail.com",
        "Address":"NE"
        }
      ];
    return { sample };
  }
}