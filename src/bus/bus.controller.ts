import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { BusService } from './bus.service';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { JwtAuthGuard } from 'src/lib/db/authGuard';

@UseGuards(JwtAuthGuard)
@Controller('bus')
export class BusController {
  constructor(private readonly busService: BusService) { }
  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createBusDto: CreateBusDto, @Request() req) {
    console.log(req.user)
    return await this.busService.create(createBusDto, req.user.id);
  }

  @Get()
  findAll() {
    return this.busService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.busService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBusDto: UpdateBusDto) {
    return this.busService.update(id, updateBusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.busService.remove(id);
  }
}
