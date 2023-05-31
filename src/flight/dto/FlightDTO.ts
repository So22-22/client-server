import { FindOperator } from "typeorm";

export class CreateFlightDto {
    numberflight: any;
    dateflight: any;
    countries: readonly unknown[] | FindOperator<unknown>;
  }
  
  