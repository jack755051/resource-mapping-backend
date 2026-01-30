import { PartialType } from '@nestjs/mapped-types';
import { CreateSupportTypeDto } from './create-support-type.dto';

export class UpdateSupportTypeDto extends PartialType(CreateSupportTypeDto) {}
