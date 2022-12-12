import { ApiProperty } from '@nestjs/swagger';

export class SetKeyDto {
  @ApiProperty()
  readonly key: string;
}

export class KeySetDto {
  @ApiProperty()
  readonly key: string;
}
