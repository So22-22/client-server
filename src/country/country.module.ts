import { Module } from '@nestjs/common';
import { Country } from './country.entity';
import { CountryService } from './country.service';
import { CountryController } from './country.controller';
import { DatasourceModule } from '../datasource/datasource.module';
import { Passenger } from 'src/passenger/passenger.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

/*@Module({
    controllers: [CountryController],
    providers: [CountryService],
    imports: [DatasourceModule],
  })
  export class CountryModule {}*/


  @Module({
    controllers: [CountryController],
    providers: [CountryService],
    imports: [
      DatasourceModule,
      TypeOrmModule.forFeature([Passenger, Country]),],
  })
  export class CountriesModule {}
