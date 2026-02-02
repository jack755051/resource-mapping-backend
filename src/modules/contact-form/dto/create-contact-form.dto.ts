// src/modules/contact/dto/create-contact.dto.ts
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  Length,
  IsEnum,
} from 'class-validator';
import { ContactFormType } from '../constants/contact-form.constants';

export class CreateContactFormDto {
  @IsString()
  @IsNotEmpty({ message: '姓名為必填' })
  name: string;

  @IsEmail({}, { message: '信箱格式不正確' })
  @IsNotEmpty()
  email: string;

  @IsOptional()
  @IsString()
  phone: string;

  @IsString()
  @Length(10, 1000, { message: '留言內容請介於 10 到 1000 字之間' })
  message: string;

  @IsArray()
  @IsEnum(ContactFormType, { each: true, message: '諮詢類型不正確' })
  type: ContactFormType[];
}
