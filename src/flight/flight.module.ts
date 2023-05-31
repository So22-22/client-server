import { Module } from '@nestjs/common';
import { Flight } from './flight.entity';
import { FlightService } from './flight.service';
import { FlightController } from './flight.controller';
import { DatasourceModule } from '../datasource/datasource.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Passenger } from 'src/passenger/passenger.entity';


//@Module({
   // controllers: [FlightController],
    //providers: [FlightService],
    //imports: [DatasourceModule],
 // })
//export class FlightModule {}
    

@Module({
  controllers: [FlightController],
  providers: [FlightService],
  imports: [
    DatasourceModule,
    TypeOrmModule.forFeature([Passenger, Flight]),],
})
export class FlightsModule {}


