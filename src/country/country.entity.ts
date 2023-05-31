import { Passenger } from 'src/passenger/passenger.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('countries')
export class Country {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ unique: true }) //поле должно быть уникальным
  namecountry: string;
  @Column()
  namecity: string;
  @ManyToMany((type) => Passenger, (passenger) => passenger.countries)
  @JoinTable({
    name: 'passenger_country',
    joinColumn: { name: 'country_id' },
    inverseJoinColumn: { name: 'passenger_id' },
  })
  passengers: Passenger[];
  flights: import("c:/Users/annna/project/src/flight/flight.entity").Flight[];
}



/*export class Country {
    id: number;
    namecountry: string;
    namecity: string;
  }*/
  