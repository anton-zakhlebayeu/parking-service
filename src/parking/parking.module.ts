import { Module } from '@nestjs/common';
import { ParkingController } from './v1/parking.controller';
import { ParkingService } from './parking.service';
import {
  InMemoryParkingRepository,
  IParkingRepository,
} from './parking.repository';

@Module({
  imports: [],
  controllers: [ParkingController],
  providers: [
    {
      provide: IParkingRepository,
      useClass: InMemoryParkingRepository,
    },
    ParkingService,
  ],
})
export class ParkingModule {}
