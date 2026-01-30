import { PartialType } from '@nestjs/mapped-types';
import { CreateConstantDto } from './create-constant.dto';

export class UpdateConstantDto extends PartialType(CreateConstantDto) {}
