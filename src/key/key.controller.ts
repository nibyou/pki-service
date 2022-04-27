import { Controller, Get } from '@nestjs/common';
import { KeyService } from './key.service';
import { Public } from 'nest-keycloak-connect';
import { JsonResponse } from '../types/JsonResponse';

@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @Get('ping')
  @Public()
  async ping(): Promise<JsonResponse> {
    const pingResponse = await this.keyService.ping();
    return new JsonResponse().setMessage(pingResponse);
  }
}
