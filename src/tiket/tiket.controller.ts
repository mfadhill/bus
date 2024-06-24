import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request } from '@nestjs/common';
import { TiketService } from './tiket.service';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';
import { JwtAuthGuard } from 'src/lib/db/authGuard';

@UseGuards(JwtAuthGuard)
@Controller('tiket')
export class TiketController {
  constructor(private readonly tiketService: TiketService) { }

  @UseGuards(JwtAuthGuard)
  @Post(":busId")
  async create(@Body() @Param("busId") createTiketDto: CreateTiketDto, @Request() req) {
    console.log(req.user)
    return await this.tiketService.create(createTiketDto, req.user.id, req.params.busId
    );
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.tiketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tiketService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTiketDto: UpdateTiketDto) {
    return this.tiketService.update(id, updateTiketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tiketService.remove(id);
  }
}
