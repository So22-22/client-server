import { Passenger } from 'src/passenger/passenger.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('articles')
export class Flight {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  numberflight: any;
  @Column()
  dateflight: any;
  @ManyToMany((type) => Passenger, (passenger) => passenger.flights)
  @JoinTable({
    name: 'passenger_flight',
    joinColumn: { name: 'flight_id' },
    inverseJoinColumn: { name: 'passenger_id' },
  })
  flights: Passenger[];
    countries: import("c:/Users/annna/project/src/country/country.entity").Country[];
  passengers: any;
}




/*export class Flight {
    [x: string]: any;
    id: number;
    numberflight: any;
    dateflight: any;
  }*/

  