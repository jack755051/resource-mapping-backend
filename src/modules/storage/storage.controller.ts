import { Controller, Post, UseInterceptors, UploadedFile, ParseFilePipe, MaxFileSizeValidator, FileTypeValidator } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { StorageService } from './storage.service';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) { }

  // 1. 圖片上傳接口
  @Post('upload/image')
  @UseInterceptors(FileInterceptor('file')) // 攔截名為 'file' 的檔案
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: parseInt(process.env.MAX_IMAGE_SIZE || '2097152', 10) }), // 限制 2MB
          new FileTypeValidator({ fileType: 'image/(jpeg|png|webp)' }),
        ],
      }),
    ) file: Express.Multer.File,
  ) {
    // 呼叫 Service 並指定存放於 images 資料夾
    return this.storageService.upload(file, 'products/images');
  }

  // 2. 下載檔案上傳接口 (PDF/Doc)
  @Post('upload/document')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: parseInt(process.env.MAX_DOCUMENT_SIZE || '10485760', 10) }), // 限制 10MB
          new FileTypeValidator({ fileType: 'application/pdf|msword|application/vnd.openxmlformats-officedocument.wordprocessingml.document' }),
        ],
      }),
    ) file: Express.Multer.File,
  ) {
    // 呼叫 Service 並指定存放於 downloads 資料夾
    return this.storageService.upload(file, 'products/downloads');
  }
}