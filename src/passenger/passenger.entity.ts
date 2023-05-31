import { ApiProperty } from '@nestjs/swagger';
import { Baggage } from 'src/baggage/baggage.entity';
import { Country } from 'src/country/country.entity';
import { Flight } from 'src/flight/flight.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('passengers') //указываем что это не просто клаcс, а сущность в рамках TypeOrm, в БД будет храниться как таблица
export class Passenger {
  @ApiProperty({ example: '1', description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn() //колонка - идентификатор, значение генерируется автоматически
  id: number;
  @Column({}) //колонка таблицы, сюда можно добавить большое количество параметров для БД, например тип, уникальность, триггер и т.д.
  fullname: string;
  @Column()
  numberticket: any;
  @ManyToOne((type) => Flight, (flight) => flight.passengers) //Создадим связь многие ко многим с сущностью  и свяжем с полем в статье
  @JoinTable({
    //join таблица с названием 
    name: 'passenger_flight',
    joinColumn: { name: 'passenger_id' }, //для связи с идентификатором пассажира
    inverseJoinColumn: { name: 'flight_id' }, //для связи с идентификатором статьи
  })
  flights: Flight[]; //объект, в котором будем автоматически получать все статьи пасажира
  @ManyToOne((type) => Country, (country) => country.passengers) //тоже самое для аффилиаций
  @JoinTable({
    name: 'passenger_country',
    joinColumn: { name: 'passenger_id' },
    inverseJoinColumn: { name: 'country_id' },
  })
  countries: Country[];
    @ManyToOne((type) => Baggage, (baggage) => baggage.passengers) //тоже самое для аффилиаций
  @JoinTable({
    name: 'passenger_baggage',
    joinColumn: { name: 'passenger_id' },
    inverseJoinColumn: { name: 'baggage_id' },
  })
  baggages: Baggage[];
}


/*export class Passenger {
    id: number;
    fullname: string;
    numberticket: any;
  }*/

  