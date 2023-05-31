import { PassengerService } from './passenger.service';
import { Controller } from '@nestjs/common';
import { Passenger } from './passenger.entity';
import { Get } from '@nestjs/common';
import { Put} from '@nestjs/common';
import { Post} from '@nestjs/common';
import { Body} from '@nestjs/common';
import { Param} from '@nestjs/common';
import { Delete} from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreatePassengerDto } from './dto/PassengerDTO';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Controller('passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

@Get()
  findAll() {
    return this.passengerService.findAll();
}
@Get(':id')
  findOne(@Param('id') id: string) {
    return this.passengerService.findOne(+id);
}
@Put(':id')
  update(@Param('id') id: string, @Body() updatePassenger: Passenger) {
    return this.passengerService.update(+id, updatePassenger);
}
@Post()
  create(@Body() createPassenger: Passenger) {
    return this.passengerService.create(createPassenger);
}
@Delete(':id')
  remove(@Param('id') id: string) {
    return this.passengerService.remove(+id);
}

@Get('incomplete')
  findIncomplete() {
    this.passengerService.findIncomplete();
  }}


    







