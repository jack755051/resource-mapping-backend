import { PartialType } from '@nestjs/mapped-types';
import { CreateConactDto } from './create-conact.dto';

export class UpdateConactDto extends PartialType(CreateConactDto) {}
