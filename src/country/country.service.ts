import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flight } from 'src/flight/flight.entity';
import { Passenger } from 'src/passenger/passenger.entity';
import { In, Repository } from 'typeorm';
import { DatasourceService } from '../datasource/datasource.service';
import { Country } from './country.entity';
import { CreateCountryDto } from './dto/CountryDTO';
import { IncompleteCountryDto } from './dto/incomplete-country.dto';
@Injectable()
export class CountryService {
  constructor(
    @InjectRepository(Passenger)
    private readonly passengerRepository: Repository<Passenger>, // "внедряем" репозиторий Author в сервис
    @InjectRepository(Country)
    private readonly countryRepository: Repository<Country>, // "внедряем" репозиторий Affiliation в сервис
    @InjectRepository(Flight)
    private readonly flightRepository: Repository<Flight>, // "внедряем" репозиторий Artilcle в сервис
  ) {}
  async create(countryDto: CreateCountryDto): Promise<Country>
 {
    //получаем объект CreateAuthorDto
    const country = this.countryRepository.create(); //создаем объект Author из репозитория
    country.namecity = countryDto.namecity; //заполняем поля объекта Author
    country.namecountry = countryDto.namecountry;
    const flights = await this.flightRepository.findBy({
      //получаем массив Affiliation по id
      id: In(countryDto.flights),
    });
    country.flights = flights;
    await this.countryRepository.save(country); //сохраняем объект Author в БД
    return country; //возвращаем объект Author
  }
  async findAll(): Promise<Country[]> {
    const countries = await this.countryRepository.find({
      //получаем связанные объекты
      relations: {
        flights: true,
        passengers: true,
      },
    }); //получаем массив Author из БД
    return countries; //возвращаем массив Author
  }
  findOne(id: number): Promise<Country> {
    // Promise<Author> - указывает, что функция возвращает объект Author в виде Promise (c асинхронного потока)
    return this.countryRepository.findOne({
      //получаем объект Author по id
      where: { id }, //указываем условие поиска по id
      relations: { flights: true, passengers: true }, //получаем связанные объекты
    });
  }
  async findIncomplete(): Promise<IncompleteCountryDto[]> {
    const countries = await this.countryRepository.find(); //получаем массив Author из БД
    const incompleteCountries: IncompleteCountryDto[] = countries.map((country) => {
      //преобразуем массив Author в массив IncompleteAuthorDto
      const incompleteCountry = new IncompleteCountryDto();
      incompleteCountry.id = country.id;
      incompleteCountry.namecountry = country.namecountry;
      return incompleteCountry;
    });
    return incompleteCountries; //возвращаем массив IncompleteAuthorDto
  }
  async update(id: number, updatedCountry: Country) {
    //получаем объект Author для обновления по id
    const country = await this.countryRepository.findOne({ where: { id } }); //получаем объект Author по id из БД
    country.namecity = updatedCountry.namecity; //обновляем поля объекта Author
    country.namecountry = updatedCountry.namecountry;
    country.flights = updatedCountry.flights;
    country.passengers = updatedCountry.passengers;
    await this.countryRepository.save(country); //сохраняем объект Author в БД
    return country; //возвращаем объект Author
  }
  remove(id: number) {
    this.countryRepository.delete({ id }); //удаляем объект Author из БД
  }

}





