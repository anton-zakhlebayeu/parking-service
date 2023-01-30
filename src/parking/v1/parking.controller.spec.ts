const choiceMock = jest.fn(() => 0);
jest.mock('../../common/utils', () => ({
  __esModule: true,
  choice: choiceMock,
}));

import { BadRequestException, NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import {
  IParkingRepository,
  InMemoryParkingRepository,
} from '../parking.repository';
import { ParkingService } from '../parking.service';
import { ParkingController } from './parking.controller';
import { ConfigModule } from '@nestjs/config';
import { configuration } from '../../config';

describe('ParkingController', () => {
  let controller: ParkingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
          load: [configuration],
          envFilePath: ['.env.local'],
        }),
      ],
      controllers: [ParkingController],
      providers: [
        {
          provide: IParkingRepository,
          useClass: InMemoryParkingRepository,
        },
        ParkingService,
      ],
    }).compile();

    controller = module.get<ParkingController>(ParkingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('park method', () => {
    it('success', async () => {
      const result = await controller.park({ plateNumber: 'abcd' });
      expect(result).toEqual({ plateNumber: 'abcd', slotNumber: 0 });
    });

    it('same license plate', async () => {
      await controller.park({ plateNumber: 'abcd' });
      try {
        await controller.park({ plateNumber: 'abcd' });
      } catch (err) {
        expect(err).toEqual(new BadRequestException('Car is already parked'));
      }
    });

    it('places exceed', async () => {
      await controller.park({ plateNumber: 'abcd' });
      choiceMock.mockImplementationOnce(() => 1);
      await controller.park({ plateNumber: 'abcde' });
      choiceMock.mockImplementationOnce(() => 2);
      await controller.park({ plateNumber: 'abcdef' });
      choiceMock.mockImplementationOnce(() => 3);
      await controller.park({ plateNumber: 'abcdefg' });
      choiceMock.mockImplementationOnce(() => 4);
      await controller.park({ plateNumber: 'abcdefgh' });
      try {
        await controller.park({ plateNumber: 'abcdefghi' });
      } catch (err) {
        expect(err).toEqual(
          new BadRequestException(
            "There's no avaiable places. Try again later",
          ),
        );
      }
    });
  });

  describe('unpark method', () => {
    it('not found', async () => {
      try {
        await controller.unpark({ plateNumber: 'abcd' });
      } catch (e) {
        expect(e).toEqual(new BadRequestException('Your car is not parked'));
      }
    });

    it('success', async () => {
      await controller.park({ plateNumber: 'abcd' });
      const result = await controller.unpark({ plateNumber: 'abcd' });
      expect(result).toEqual({ slotNumber: 0, plateNumber: 'abcd' });
    });
  });

  describe('getSlotInfo method', () => {
    it('wrong size', async () => {
      try {
        await controller.getSlotInfo(10);
      } catch (e) {
        expect(e).toEqual(new NotFoundException());
      }
    });

    it('success empty slot', async () => {
      const result = await controller.getSlotInfo(2);
      expect(result).toEqual({ slotNumber: 2, isFree: true });
    });

    it('success parked place', async () => {
      await controller.park({ plateNumber: 'abcd' });
      const result = await controller.getSlotInfo(0);
      expect(result).toEqual({
        slotNumber: 0,
        plateNumber: 'abcd',
        isFree: false,
      });
    });
  });
});
