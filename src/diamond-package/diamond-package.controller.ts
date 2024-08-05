import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { DiamondPackageService } from './diamond-package.service';
import { CreateDiamondPackageDto } from './dto/create-diamond-package.dto';
import { UpdateDiamondPackageDto } from './dto/update-diamond-package.dto';

@Controller('diamond-package')
export class DiamondPackageController {
  constructor(private readonly diamondPackageService: DiamondPackageService) {}

  @Post()
  create(@Body() createDiamondPackageDto: CreateDiamondPackageDto) {
    return this.diamondPackageService.create(createDiamondPackageDto);
  }

  @Get()
  findAll() {
    return this.diamondPackageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.diamondPackageService.findOne(+id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateDiamondPackageDto: UpdateDiamondPackageDto,
  ) {
    return this.diamondPackageService.update(+id, updateDiamondPackageDto);
  }
}
