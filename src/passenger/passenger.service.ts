import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Country } from 'src/country/country.entity';
import { DatasourceService } from 'src/datasource/datasource.service';
import { Flight } from 'src/flight/flight.entity';
import { Repository, In } from 'typeorm';
import { IncompletePassengerDto } from './dto/incomplete-passenger.dto';
import { CreatePassengerDto } from './dto/PassengerDTO';
import { Passenger } from './passenger.entity';
@Injectable()
export class PassengerService {
      constructor(
        @InjectRepository(Passenger)
        private readonly passengerRepository: Repository<Passenger>, // "внедряем" репозиторий Author в сервис
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>, // "внедряем" репозиторий Affiliation в сервис
        @InjectRepository(Flight)
        private readonly FlightRepository: Repository<Flight>, // "внедряем" репозиторий Artilcle в сервис
      ) {}
      async create(passengerDto: CreatePassengerDto): Promise<Passenger>
      {
         //получаем объект CreateAuthorDto
         const passenger = this.passengerRepository.create(); //создаем объект Author из репозитория
         passenger.fullname = passengerDto.fullname; //заполняем поля объекта Author
         passenger.numberticket= passengerDto.numberticket;
         const countries = await this.countryRepository.findBy({
           //получаем массив Affiliation по id
           id: In(passengerDto.countries),
         });
         passenger.countries = countries;
         await this.passengerRepository.save(passenger); //сохраняем объект Author в БД
         return passenger; //возвращаем объект Author
       }
       async findAll(): Promise<Passenger[]> {
        const passengers = await this.passengerRepository.find({
          //получаем связанные объекты
          relations: {
            countries: true,
            flights: true,
          },
        }); //получаем массив Author из БД
        return passengers; //возвращаем массив Author
      }
      findOne(id: number): Promise<Passenger> {
        // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
        return this.passengerRepository.findOne({
          //получаем объект Author по id
          where: { id }, //указываем условие поиска по id
          relations: { countries: true, flights: true }, //получаем связанные объекты
        });
      }
      async findIncomplete(): Promise<IncompletePassengerDto[]> {
        const passengers = await this.passengerRepository.find(); //получаем массив Author из БД
        const incompletePassengers: IncompletePassengerDto[] = passengers.map((passenger) => {
          //преобразуем массив Author в массив IncompleteAuthorDto
          const incompletePassenger = new IncompletePassengerDto();
          incompletePassenger.id = passenger.id;
          incompletePassenger.numberticket = passenger.numberticket;
          return incompletePassenger;
        });
        return incompletePassengers; //возвращаем массив IncompleteAuthorDto
      }
      async update(id: number, updatedPassenger: Passenger) {
        //получаем объект Author для обновления по id
        const passenger = await this.passengerRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
        passenger.fullname = updatedPassenger.fullname; //обновляем поля объекта Author
        passenger.numberticket = updatedPassenger.numberticket;
        passenger.countries = updatedPassenger.countries;
        passenger.flights = updatedPassenger.flights;
        await this.passengerRepository.save(passenger); //сохраняем объект Author в БД
        return passenger; //возвращаем объект Author
      }
      remove(id: number) {
        this.passengerRepository.delete({ id }); //удаляем объект Author из БД
      }}
    
    

    
     
                    
    
             
