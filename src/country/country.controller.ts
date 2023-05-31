import { CountryService } from './country.service';
import { Controller} from '@nestjs/common';
import { Country } from './country.entity';
import { Get } from '@nestjs/common';
import { Put} from '@nestjs/common';
import { Post} from '@nestjs/common';
import { Body} from '@nestjs/common';
import { Param} from '@nestjs/common';
import { Delete} from '@nestjs/common';


@Controller('country')
export class CountryController {
  constructor(private readonly countryService: CountryService) {}

@Get()
  findAll() {
    return this.countryService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.countryService.findOne(+id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateCountry: Country) {
    return this.countryService.update(+id, updateCountry);
  }
  @Post()
  create(@Body() createCountry: Country) {
    return this.countryService.create(createCountry);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.countryService.remove(+id);
  }

  @Get('incomplete')
  findIncomplete() {
    this.countryService.findIncomplete();
  }
}


function findIncomplete() {
  throw new Error('Function not implemented.');
}

