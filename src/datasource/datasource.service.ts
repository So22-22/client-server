import { Injectable } from '@nestjs/common';
import { Country } from '../country/country.entity';
import { Flight } from '../flight/flight.entity';
import { Passenger } from '../passenger/passenger.entity';

@Injectable()
export class DatasourceService {
  private country: Country[] = [];

  getCountry(): Country[] {
    return this.country;
  }
  
  private flight: Flight[] = [];

  getFlight(): Flight[] {
    return this.flight;
  }
  private passenger: Passenger[] = [];

  getPassenger(): Passenger[] {
    return this.passenger;
  }
}
