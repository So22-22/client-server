import { FlightService } from './flight.service';
import { Controller} from '@nestjs/common';
import { Flight } from './flight.entity';
import { Get } from '@nestjs/common';
import { Put} from '@nestjs/common';
import { Post} from '@nestjs/common';
import { Body} from '@nestjs/common';
import { Param} from '@nestjs/common';
import { Delete} from '@nestjs/common';


@Controller('flight')
export class FlightController {
  constructor(private readonly flightService: FlightService) {}

  @Get()
  findAll() {
    return this.flightService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.flightService.findOne(+id);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() updateFlight: Flight) {
    return this.flightService.update(+id, updateFlight);
  }
  @Post()
  create(@Body() createFlight: Flight) {
    return this.flightService.create(createFlight);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.flightService.remove(+id);
  }
  @Get('incomplete')
  findIncomplete() {
    this.flightService.findIncomplete();
  }
}

