import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DiamondPurchaseService } from './diamond-purchase.service';
import { CreateDiamondPurchaseDto } from './dto/create-diamond-purchase.dto';
import { UpdateDiamondPurchaseDto } from './dto/update-diamond-purchase.dto';

@Controller('diamond-purchase')
export class DiamondPurchaseController {
  constructor(
    private readonly diamondPurchaseService: DiamondPurchaseService,
  ) {}

  @Post()
  create(@Body() createDiamondPurchaseDto: CreateDiamondPurchaseDto) {
    return this.diamondPurchaseService.create(createDiamondPurchaseDto);
  }

  @Get()
  findAll() {
    return this.diamondPurchaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diamondPurchaseService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: number,
    @Body() updateDiamondPurchaseDto: UpdateDiamondPurchaseDto,
  ) {
    return this.diamondPurchaseService.update(id, updateDiamondPurchaseDto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.diamondPurchaseService.delete(id);
  }
}
