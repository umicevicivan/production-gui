import { UnitOfMeasure } from '../units-of-measure/unit-of-measure';

export class Product {
  id: number;
  name: string;
  professionalName: string;
  shape: string;
  description: string;
  instruction: string;
  price: number;
  unitOfMeasure: UnitOfMeasure;
}
