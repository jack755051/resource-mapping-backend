// src/shared/skip-i18n.decorator.ts
import { SetMetadata } from '@nestjs/common';

// 💡 定義一個 Meta Key，稍後攔截器會用這個 Key 來檢查
export const SKIP_I18N_KEY = 'skipI18n';

// 💡 建立裝飾器函數
export const SkipI18n = () => SetMetadata(SKIP_I18N_KEY, true);