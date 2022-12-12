import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Post,
} from '@nestjs/common';
import { KeyService } from './key.service';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthenticatedUser, Public } from 'nest-keycloak-connect';
import { AuthUser, JsonResponse } from '@nibyou/types';
import { KeySetDto, SetKeyDto } from './dtos/set-key.dto';
import { GetKeyDto } from './dtos/get-key.dto';

@ApiBearerAuth()
@ApiTags('Key')
@Controller('key')
export class KeyController {
  constructor(private readonly keyService: KeyService) {}

  @ApiOperation({
    summary: 'Get Ping Response',
    description: 'Returns a Redis ping response',
    operationId: 'getPing',
  })
  @Get('ping')
  async ping(): Promise<JsonResponse> {
    const pingResponse = await this.keyService.ping();
    return new JsonResponse().setMessage(pingResponse);
  }

  @ApiOperation({
    summary: 'Set Key',
    description: 'Sets a key with a value for the current user',
    operationId: 'setKey',
  })
  @ApiBody({
    description: 'Set a key with a value for the current user',
    type: SetKeyDto,
  })
  @Post('')
  async setKey(
    @Body() body: SetKeyDto,
    @AuthenticatedUser() user: AuthUser,
  ): Promise<KeySetDto> {
    const setKeyResponse = await this.keyService.setKey(body.key, user);
    return { key: setKeyResponse };
  }

  @ApiOperation({
    summary: 'Get Key',
    description: 'Returns a Public RSA Key for a given ID',
    operationId: 'getKey',
  })
  @ApiCreatedResponse({
    description: 'Returns a Public RSA Key for a given ID',
    type: GetKeyDto,
  })
  @ApiNotFoundResponse({
    description: 'Returns a 404 if the key does not exist',
    type: HttpException,
  })
  @Public()
  @Get(':id')
  async getKey(@Param('id') id: string): Promise<GetKeyDto> {
    const key = await this.keyService.getKey(id);
    if (!key) {
      throw new HttpException(
        new JsonResponse().setError(new Error('Key not found')),
        404,
      );
    }
    return { key };
  }
}
