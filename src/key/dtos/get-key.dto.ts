import { ApiProperty } from '@nestjs/swagger';

export class GetKeyDto {
  @ApiProperty()
  readonly key: string;
}
