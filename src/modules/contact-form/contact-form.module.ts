import { Module } from '@nestjs/common';
import { ContactFormService } from './contact-form.service';
import { ContactFormController } from './contact-form.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactForm } from './entities/contact-form.entity';
import { NotificationModule } from '../notification/notification.module';

@Module({
  imports: [TypeOrmModule.forFeature([ContactForm]), NotificationModule],
  controllers: [ContactFormController],
  providers: [ContactFormService],
})
export class ContactFormModule {}
