import { PartialType } from '@nestjs/mapped-types';
import { CreateLiveViewChannelDto } from './create-live-view-channel.dto';

export class UpdateLiveViewChannelDto extends PartialType(CreateLiveViewChannelDto) {}
