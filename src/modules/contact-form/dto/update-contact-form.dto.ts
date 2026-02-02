import { PartialType } from '@nestjs/mapped-types';
import { CreateContactFormDto } from './create-contact-form.dto';

export class UpdateContactFormDto extends PartialType(CreateContactFormDto) {}
