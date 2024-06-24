import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { PrismaService } from 'src/prisma.service';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService, // Ensure JwtService is injected
  ) { }

  async validateUser(authPayloadDto: CreateAuthDto) {
    const user = await this.prisma.user.findFirst({ where: { email: authPayloadDto.email } });

    if (!user) {
      throw new HttpException("Invalid email", HttpStatus.UNAUTHORIZED);
    }

    const matchesPassword = await bcrypt.compare(authPayloadDto.password, user.password);

    if (!matchesPassword) {
      throw new HttpException("Invalid password", HttpStatus.UNAUTHORIZED);
    }

    const { password, ...result } = user;
    return result;
  }

  async login(body: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: body.email,
        name: body.name,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const matchesPassword = await bcrypt.compare(body.password, user.password);
    if (!matchesPassword) {
      throw new HttpException("Invalid password", HttpStatus.UNAUTHORIZED);
    }

    const payload = { email: user.email, id: user.id, name: user.name }; // Include user id in the payload
    const token = this.jwtService.sign(payload);
    return { access_token: token };
  }

  async register(body: CreateAuthDto) {
    const hashedPassword = await bcrypt.hash(body.password, 10);
    const user = await this.prisma.user.create({
      data: {
        ...body,
        password: hashedPassword,
      },
    });
    const { password, ...result } = user; // Exclude password from the returned user object
    return result;
  }

  async findUserById(id: string) {
    return await this.prisma.user.findUnique({ where: { id: id } });
  }
}
