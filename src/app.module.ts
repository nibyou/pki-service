import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { KeycloakModule } from '@nibyou/keycloak';
import { KeyModule } from './key/key.module';
import { RedisModule } from '@liaoliaots/nestjs-redis';

@Module({
  imports: [
    KeycloakModule,
    RedisModule.forRoot({
      config: {
        url: process.env.REDIS_URL,
      },
    }),
    KeyModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
