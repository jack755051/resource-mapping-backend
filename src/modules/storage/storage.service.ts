import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Injectable()
export class StorageService {
  // 核心上傳方式
  async upload(file: Express.Multer.File, folder: 'products/images' | 'products/downloads') {
    // 1. 產生唯一的 UUID 檔名，保留原始副檔名
    const fileExtension = path.extname(file.originalname);
    const fileName = `${uuidv4()}${fileExtension}`;

    // 2. 組合 R2 的 Key (路徑)
    const key = `${folder}/${fileName}`;


    return {
      id: uuidv4(), // 給前端作為列表 key 使用
      url: `https://assets.guanring.com/${key}`, // 你綁定的 Cloudflare Domain
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname, // 保留原始名稱僅供顯示用
    };
  }
}
