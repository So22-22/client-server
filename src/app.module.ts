import { Module } from '@nestjs/common';
import { CountriesModule } from './country/country.module';
import { DatasourceModule } from './datasource/datasource.module';
import { FlightsModule } from './flight/flight.module';
import { PassengersModule } from './passenger/passenger.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  //imports: [CountryModule, FlightModule, PassengerModule, DatasourceModule],
  //controllers: [],
  //providers: [],
  
  imports: [
    CountriesModule,
    DatasourceModule,
    TypeOrmModule.forRoot({
      type: 'postgres', //тип подключаемой БД
      port: 5432, //порт
      username: 'education', //имя пользователя
      password: 'password', //пароль
      host: 'localhost', //хост, в нашем случае БД развернута локально
      synchronize: false, //отключаем автосинхронизацию(в противном случае при каждом перезапуске наша БД будет создаваться заново)
      logging: 'all', //включим логирование для удобства отслеживания процессов
	  entities: ['dist/**/*.entity{.ts,.js}'], //указываем путь к сущностям
    }),
  ],

})
export class AppModule {}


