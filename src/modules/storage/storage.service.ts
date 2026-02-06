import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
  ListObjectsV2Command,
  DeleteObjectCommand,
} from "@aws-sdk/client-s3";

@Injectable()
export class StorageService {
  private s3Client: S3Client;

  constructor() {
    this.s3Client = new S3Client({
      region: "auto",
      endpoint: `https://${process.env.R2_ACCOUNT_ID ?? ''}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: process.env.R2_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY ?? '',
      },
    });
  }

  /**
   * 上傳檔案
   * @param file 檔案
   * @param folder 檔案資料夾
   * @returns 
   */
  async upload(file: Express.Multer.File, folder: 'products/images' | 'products/downloads') {
    // 1. 產生用於 R2 儲存的 UUID 檔名
    const fileExtension = path.extname(file.originalname);
    const r2FileName = `${uuidv4()}${fileExtension}`;
    const key = `${folder}/${r2FileName}`;

    await this.s3Client.send(new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
      Body: file.buffer,
      ContentType: file.mimetype,
    }));

    return {
      // 這裡的 ID 是給前端 Nuxt 用的，方便在列表渲染時作為 key
      // 或者是未來你存入 ProductDownload Entity 時的主鍵
      id: uuidv4(),
      url: `${process.env.R2_PUBLIC_DOMAIN}/${key}`,
      size: file.size,
      mimeType: file.mimetype,
      originalName: file.originalname,
      date: new Date().toISOString(),
    };
  }

  /**
   * 下載檔案
   * @param key R2 檔案路徑
   * @returns 
   */
  async download(key: string) {
    const command = new GetObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    });
    const response = await this.s3Client.send(command);
    return response.Body;
  }

  /**
   * 刪除檔案
   * @param url 檔案 URL
   */
  async delete(url: string) {
    // 從 URL 解析出 Key (例如 products/images/...)
    const key = url.replace(`${process.env.R2_PUBLIC_DOMAIN}/`, '');
    await this.s3Client.send(new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME,
      Key: key,
    }));
  }

}