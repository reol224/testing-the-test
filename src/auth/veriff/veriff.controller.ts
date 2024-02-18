import {
  Controller,
  Patch,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { VeriffService } from './veriff.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('veriff')
export class VeriffController {
  constructor(private readonly veriffService: VeriffService) {}

  @Post()
  async initiateVerification() {
    return this.veriffService.initiateVerification();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadDocument(@UploadedFile() file: Express.Multer.File) {
    return this.veriffService.uploadDocument(file);
  }

  @Patch()
  async submit() {
    return this.veriffService.submit();
  }
}
