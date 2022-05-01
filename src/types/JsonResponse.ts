import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class JsonResponse {
  @ApiPropertyOptional({
    description: 'Data from the API response, can be of any type',
  })
  public data: any;

  @ApiPropertyOptional({
    description: 'Message from the API, likely a status',
  })
  public message: string;

  @ApiPropertyOptional({
    description: 'Error, if thrown',
  })
  public error: any;

  @ApiProperty({
    required: true,
    description: 'Timestamp of the start of the response',
  })
  public ts: string;

  constructor() {
    this.ts = new Date().toISOString();
  }

  public setMessage(message: string): JsonResponse {
    this.message = message;
    return this;
  }

  public setError(error: Error): JsonResponse {
    this.error = {
      message: error.message,
    };
    return this;
  }

  public setData(data: any): JsonResponse {
    this.data = data;
    return this;
  }
}
