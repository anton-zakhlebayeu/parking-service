import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import {
  InMemoryParkingRepository,
  IParkingRepository,
} from './parking.repository';
import { choice } from '../common/utils';
import { ParkingInfoDto, SlotInfoDto } from './v1/dto';

@Injectable()
export class ParkingService {
  constructor(
    @Inject(IParkingRepository)
    private readonly parkingRepository: InMemoryParkingRepository,
  ) {}

  park = async (plateNumber: string): Promise<ParkingInfoDto> => {
    const slotNumber = await this.parkingRepository.getCarParkingSlot(
      plateNumber,
    );
    if (slotNumber !== -1) {
      throw new BadRequestException('Car is already parked');
    }

    const freePlaces = await this.parkingRepository.getFreePlaces();

    if (freePlaces.length === 0) {
      throw new BadRequestException(
        "There's no avaiable places. Try again later",
      );
    }

    // Random is more proven way to take free place than taking first/last
    const freeSlotNumber = choice(freePlaces);

    await this.parkingRepository.park(plateNumber, freeSlotNumber);

    return {
      plateNumber,
      slotNumber: freeSlotNumber,
    };
  };

  unpark = async (plateNumber: string): Promise<ParkingInfoDto> => {
    const slotNumber = await this.parkingRepository.getCarParkingSlot(
      plateNumber,
    );

    if (slotNumber === -1) {
      throw new BadRequestException('Your car is not parked');
    }

    await this.parkingRepository.unparkBySlot(slotNumber);

    return {
      slotNumber,
      plateNumber,
    };
  };

  getSlotInfo = async (slotNumber: number): Promise<SlotInfoDto> => {
    const plateNumebr = await this.parkingRepository.getSlotInfo(slotNumber);
    const info: SlotInfoDto = {
      slotNumber,
      isFree: plateNumebr === null,
    };
    if (plateNumebr !== null) {
      info.plateNumber = plateNumebr;
    }
    return info;
  };
}
