import { Body, Injectable, UseGuards } from '@nestjs/common';
import { CreateBusDto } from './dto/create-bus.dto';
import { UpdateBusDto } from './dto/update-bus.dto';
import { JwtAuthGuard } from 'src/lib/db/authGuard';
import { PrismaService } from 'src/prisma.service';
import { Bus } from '@prisma/client';

@UseGuards(JwtAuthGuard)
@Injectable()
export class BusService {
  constructor(
    private readonly prisma: PrismaService,
  ) { }
  async create(createBusDto: CreateBusDto, userId: string) {
    return await this.prisma.bus.create({
      data: {
        ...createBusDto,
        userId: userId,
      }
    });
  }

  async findAll(): Promise<Bus[]> {
    return await this.prisma.bus.findMany();
  }

  async findOne(id: string) {
    return await this.prisma.bus.findUnique({
      where: { id: id },
    });
  }

  async update(id: string, updateBusDto: UpdateBusDto) {
    const list = await this.prisma.bus.update({
      where: { id: id },
      data: updateBusDto
    });
    return list
  }

  async remove(id: string) {
    return await this.prisma.bus.delete({ where: { id: id } });
  }
}
