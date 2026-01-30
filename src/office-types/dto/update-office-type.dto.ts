import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeTypeDto } from './create-office-type.dto';

export class UpdateOfficeTypeDto extends PartialType(CreateOfficeTypeDto) {}
