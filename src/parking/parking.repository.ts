import { Injectable, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface IParkingRepository {
  getCarParkingSlot: (plateNumber: string) => Promise<number>;
  getFreePlaces: () => Promise<number[]>;
  getSlotInfo: (slotNumber: number) => Promise<string | null>;
  park: (plateNumber: string, slotNumber: number) => Promise<void>;
  unparkBySlot: (slotNumber: number) => Promise<void>;
}

export const IParkingRepository = Symbol('IParkingRepository');

@Injectable()
export class InMemoryParkingRepository implements IParkingRepository {
  private readonly parkingPlaces: number;
  private readonly inMemoryDB: Array<string | null>;

  constructor(private configService: ConfigService) {
    this.parkingPlaces = configService.get<number>('parkingPlaces');
    this.inMemoryDB = [];
    for (let i = 0; i < this.parkingPlaces; i++) {
      this.inMemoryDB.push(null);
    }
  }

  getCarParkingSlot = async (plateNumber: string): Promise<number> => {
    return this.inMemoryDB.indexOf(plateNumber);
  };

  getFreePlaces = async (): Promise<number[]> => {
    return this.inMemoryDB
      .map((item, idx) => (item ? null : idx))
      .filter((item) => item !== null);
  };

  getSlotInfo = async (slotNumber: number): Promise<string | null> => {
    if (slotNumber < 0 || slotNumber >= this.parkingPlaces) {
      throw new NotFoundException();
    }
    return this.inMemoryDB[slotNumber];
  };

  park = async (plateNumber: string, slotNumber: number): Promise<void> => {
    this.inMemoryDB[slotNumber] = plateNumber;
  };

  unparkBySlot = async (slotNumber: number): Promise<void> => {
    this.inMemoryDB[slotNumber] = null;
  };
}
