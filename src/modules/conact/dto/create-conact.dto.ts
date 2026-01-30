import { IsString, IsNotEmpty, IsEmail, IsOptional, IsArray } from 'class-validator';

export class CreateConactDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    /**電話 */
    @IsString()
    @IsNotEmpty()
    phone: string;

    /**信箱 */
    @IsEmail()
    @IsNotEmpty()
    email: string;

    /**諮詢服務 */
    @IsArray()
    @IsNotEmpty()
    consultingServices: string[];

    /**描述 */
    @IsString()
    @IsOptional()
    description?: string;
}
