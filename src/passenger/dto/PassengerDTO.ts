import { FindOperator } from "typeorm";

export class CreatePassengerDto {
  fullname: string;
  numberticket: any;
  countries: readonly unknown[] | FindOperator<unknown>;
}
