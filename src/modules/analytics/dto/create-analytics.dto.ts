import { IsString, IsOptional, IsObject, IsNumber } from 'class-validator';

export class CreateAnalyticsDto {
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    resourceType?: string;

    @IsOptional()
    @IsString()
    resourceId?: string;

    @IsOptional()
    @IsNumber()
    durationMs?: number;

    @IsOptional()
    @IsObject()
    metadata?: any;
}