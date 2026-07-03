import { Module } from '@nestjs/common';
import { RedisCacheService } from './redis-cache.service';
import { CACHE_PORT } from './cache.tokens';

@Module({
  providers: [
    RedisCacheService,
    {
      provide: CACHE_PORT,
      useExisting: RedisCacheService,
    },
  ],
  exports: [CACHE_PORT],
})
export class CacheModule {}
