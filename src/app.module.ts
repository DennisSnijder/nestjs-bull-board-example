import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "@bull-board/nestjs";
import { FeatureModule } from "./feature/feature.module";
import { FastifyAdapter } from "@bull-board/fastify";
import { BasicAuthMiddleware } from "src/basic-auth.middleware";


@Module({
  imports: [
    // infrastructure from here
    BullModule.forRoot({
      connection: {
        host: "localhost",
        port: 6379,
        username: "default",
        password: "eYVX7EwVmmxKPCDmwMtyKVge8oLd2t81" //defined in the docker compose yml
      }
    }),

    BullBoardModule.forRoot({
      route: "/queues",
      // @ts-ignore
      adapter: FastifyAdapter
    }),

    //feature modules from here.
    FeatureModule
  ],
  controllers: [],
  providers: []
})
export class AppModule implements NestModule {

  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(BasicAuthMiddleware)
      .forRoutes('/queues', 'queues', '/queues/*')
  }
}
