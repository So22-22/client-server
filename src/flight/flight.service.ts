import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from 'src/flight/flight.entity';
import { Passenger } from 'src/passenger/passenger.entity';
import { In, Repository } from 'typeorm';
import { DatasourceService } from '../datasource/datasource.service';
import { Country } from 'src/country/country.entity';
import { CreateFlightDto } from 'src/flight/dto/FlightDTO';
import { IncompleteFlightDto } from './dto/incomplete-flight.dto';
@Injectable()
export class FlightService {
    constructor(
        @InjectRepository(Passenger)
        private readonly passengerRepository: Repository<Passenger>, // "внедряем" репозиторий Author в сервис
        @InjectRepository(Country)
        private readonly countryRepository: Repository<Country>, // "внедряем" репозиторий Affiliation в сервис
        @InjectRepository(Flight)
        private readonly flightRepository: Repository<Flight>, // "внедряем" репозиторий Artilcle в сервис
      ) {}
      async create(flightDto: CreateFlightDto): Promise<Flight>
 {
    //получаем объект CreateAuthorDto
    const flight = this.flightRepository.create(); //создаем объект Author из репозитория
    flight.numberflight = flightDto.numberflight; //заполняем поля объекта Author
    flight.dateflight = flightDto.dateflight;
    const countries = await this.countryRepository.findBy({
      //получаем массив Affiliation по id
      id: In(flightDto.countries),
    });
    flight.countries = countries;
    await this.flightRepository.save(flight); //сохраняем объект Author в БД
    return flight; //возвращаем объект Author
  }

  async findAll(): Promise<Flight[]> {
    const flights = await this.flightRepository.find({
      //получаем связанные объекты
      relations: {
        countries: true,
        passengers: true,
      },
    }); //получаем массив Author из БД
    return flights; //возвращаем массив Author
  }
  findOne(id: number): Promise<Flight> {
    // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
    return this.flightRepository.findOne({
      //получаем объект Author по id
      where: { id }, //указываем условие поиска по id
      relations: { countries: true, passengers: true }, //получаем связанные объекты
    });
  }
  async findIncomplete(): Promise<IncompleteFlightDto[]> {
    const flights = await this.flightRepository.find(); //получаем массив Author из БД
    const incompleteFlights: IncompleteFlightDto[] = flights.map((flight) => {
      //преобразуем массив Author в массив IncompleteAuthorDto
      const incompleteFlight = new IncompleteFlightDto();
      incompleteFlight.id = flight.id;
      incompleteFlight.numberflight = flight.numberflight;
      return incompleteFlight;
    });
    return incompleteFlights; //возвращаем массив IncompleteAuthorDto
  }
  async update(id: number, updatedFlight: Flight) {
    //получаем объект Author для обновления по id
    const flight = await this.flightRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
    flight.numberflight = updatedFlight.numberflight; //обновляем поля объекта Author
    flight.dateflight = updatedFlight.dateflight;
    flight.countries = updatedFlight.countries;
    flight.passengers = updatedFlight.passengers;
    await this.flightRepository.save(flight); //сохраняем объект Author в БД
    return flight; //возвращаем объект Author
  }
  remove(id: number) {
    this.flightRepository.delete({ id }); //удаляем объект Author из БД
  }
}