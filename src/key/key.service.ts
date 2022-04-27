import { Injectable } from '@nestjs/common';
import Redis from 'ioredis';
import { RedisService } from '@liaoliaots/nestjs-redis';

@Injectable()
export class KeyService {
  private readonly redis: Redis;

  constructor(private readonly redisService: RedisService) {
    this.redis = this.redisService.getClient();
    // or
    // this.redis = this.redisService.getClient(DEFAULT_REDIS_NAMESPACE);
  }

  async ping(): Promise<string> {
    return this.redis.ping();
  }
}
