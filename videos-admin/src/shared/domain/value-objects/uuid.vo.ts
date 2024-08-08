import { ValueObject } from "../value-object";
import {v4 as uuidv4, validate as uuidValidade} from 'uuid';

export class Uuid extends ValueObject{
  readonly id: string;
  
  constructor(id?: string) {
    super();
    this.id = id || uuidv4();
    this.validate();
  }

  private validate() {
    const isValid = uuidValidade(this.id);
    if(!isValid) {
      throw new InvalidUuidError();
    }
  }

  toString() {
    return this.id;
  }

}

export class InvalidUuidError extends Error {
  constructor(message?: string) {
    super(message || 'ID must be valid UUID.');
    this.name = 'InvalidUuidError';
  }
}