import { Injectable, UseGuards } from '@nestjs/common';
import { CreateTiketDto } from './dto/create-tiket.dto';
import { UpdateTiketDto } from './dto/update-tiket.dto';
import { JwtAuthGuard } from 'src/lib/db/authGuard';
import { PrismaService } from 'src/prisma.service';
import { Tiket } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Injectable()
export class TiketService {
  constructor(
    private readonly prisma: PrismaService
  ) { }
  async create(createTiketDto: CreateTiketDto, userId: string, busId: string) {
    return await this.prisma.tiket.create({
      data: {
        ...createTiketDto,
        userId: userId,
        busId: busId,
      }
    });
  }

  async findAll(): Promise<Tiket[]> {
    return await this.prisma.tiket.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.bus.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, updateTiketDto: UpdateTiketDto) {
    const list = await this.prisma.bus.update({
      where: { id: id },
      data: updateTiketDto
    });
    return list
  }
  async remove(id: string) {
    return await this.prisma.tiket.delete({ where: { id: id } });
  }
}
