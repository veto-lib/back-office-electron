export type AnimalType =
  | 'Chat'
  | 'Chien'
  | 'Oiseau'
  | 'Lézard'
  | 'Poisson'
  | 'Cheval'
  | 'Rongeur';

export interface IVeterinary {
  email: string;
  firstName: string;
  lastName: string;
  birthDate: Date;
  gender: 'M' | 'F';
  compatibleAnimals: AnimalType[];
  enabled: boolean;
}

export class Veterinary {
  static fromApiObject(veterinary: IVeterinary): IVeterinary {
    return {
      ...veterinary,
      birthDate: new Date(veterinary.birthDate),
    };
  }
}
