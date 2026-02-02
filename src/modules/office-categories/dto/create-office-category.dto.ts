import { IsObject, IsNotEmpty, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

/**
 * 語系的內層結構：確保基礎語系存在，並允許動態擴充
 */
class I18nNameDto {
    @IsString()
    @IsNotEmpty()
    zh: string; // 強制要求中文

    @IsString()
    @IsNotEmpty()
    en: string; // 強制要求英文

    // TypeScript 層級：允許額外的動態 Key (如 ja, ko, fr)
    [key: string]: string;
}

export class CreateOfficeCategoryDto {
    @IsObject()
    @ValidateNested() // 啟動巢狀驗證
    @Type(() => I18nNameDto) // 轉換為 I18nNameDto 實體以執行內部驗證
    name: I18nNameDto;
}
