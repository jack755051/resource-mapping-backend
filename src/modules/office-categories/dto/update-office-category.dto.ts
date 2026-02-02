import { PartialType } from '@nestjs/mapped-types';
import { CreateOfficeCategoryDto } from './create-office-category.dto';

export class UpdateOfficeCategoryDto extends PartialType(CreateOfficeCategoryDto) {}
