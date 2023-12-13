import { Module } from "@nestjs/common";
import { DatabaseModule } from "../database/database.module";
import { LbhChargeController } from "./lbhcharge.controller";
import { LbhChargeService } from "./lbhcharge.service";
import { LbhChargeProvider } from "./lbhcharge.provider";

@Module({
  imports: [DatabaseModule],
  controllers: [LbhChargeController],
  providers: [LbhChargeService, ...LbhChargeProvider],
  exports: [LbhChargeService],
})
export class LbhChargeModule {
}
