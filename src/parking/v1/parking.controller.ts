import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ParkDto, UnparkDto, ParkingInfoDto, SlotInfoDto } from './dto';
import { ParkingService } from '../parking.service';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('access-token')
@ApiTags('parking')
@Controller({
  path: 'parking',
  version: '1',
})
export class ParkingController {
  constructor(private readonly parkingService: ParkingService) {}

  @Get('slot/:slotNumber')
  @ApiResponse({
    status: HttpStatus.OK,
    type: SlotInfoDto,
  })
  async getSlotInfo(
    @Param('slotNumber') slotNumber: number,
  ): Promise<SlotInfoDto> {
    const slotInfo = await this.parkingService.getSlotInfo(slotNumber);
    return slotInfo;
  }

  @Post('park')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ParkingInfoDto,
  })
  async park(@Body() parkDto: ParkDto): Promise<ParkingInfoDto> {
    const { plateNumber } = parkDto;
    const parkingInfo = await this.parkingService.park(plateNumber);
    return parkingInfo;
  }

  @Post('unpark')
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: ParkingInfoDto,
  })
  async unpark(@Body() unparkDto: UnparkDto): Promise<ParkingInfoDto> {
    const { plateNumber } = unparkDto;
    const parkingInfo = await this.parkingService.unpark(plateNumber);
    return parkingInfo;
  }
}
