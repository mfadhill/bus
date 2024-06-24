import { PartialType } from '@nestjs/mapped-types';
import { CreateTiketDto } from './create-tiket.dto';

export class UpdateTiketDto extends PartialType(CreateTiketDto) {}
