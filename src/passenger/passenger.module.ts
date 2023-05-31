import { Module } from '@nestjs/common';
import { Passenger } from './passenger.entity';
import { PassengerService } from './passenger.service';
import { PassengerController } from './passenger.controller';
import { DatasourceModule } from '../datasource/datasource.module';
import { Country } from 'src/country/country.entity';
import { Flight } from 'src/flight/flight.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

//@Module({
    //controllers: [PassengerController],
    //providers: [PassengerService],
    //imports: [DatasourceModule],
 // })
  //export class PassengerModule {}  

  @Module({
    controllers: [PassengerController],
    providers: [PassengerService],
    imports: [
      DatasourceModule,
      TypeOrmModule.forFeature([Passenger, Country, Flight]),],
  })
  export class PassengersModule {}
  
