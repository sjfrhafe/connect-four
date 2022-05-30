import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const session = require("express-session")
const RedisStore = require("connect-redis")(session)
const { createClient } = require("redis")
import { ConfigService } from "@nestjs/config";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService)

  app.setGlobalPrefix('api');

  const redisClient = createClient({
    legacyMode: true, 
    url: configService.get('REDIS_URL')
  })
  await redisClient.connect()

  app.use(
    session({
      store: new RedisStore({ client: redisClient }),
      saveUninitialized: true,
      secret: configService.get('SESSION_SECRET'),
      resave: false,
    })
  )

  await app.listen(3000);


}
bootstrap();
