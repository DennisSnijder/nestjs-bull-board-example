import { Module } from "@nestjs/common";
import { BullModule } from "@nestjs/bullmq";
import { BullBoardModule } from "nestjs-bull-board";
import { FeatureModule } from "./feature/feature.module";

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
      route: "/queues"
    }),

    //feature modules from here.
    FeatureModule
  ],
  controllers: [],
  providers: []
})
export class AppModule {
}
