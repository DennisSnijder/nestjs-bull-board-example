import { Controller, Get, Inject } from "@nestjs/common";
import { BULL_BOARD_INSTANCE, BullBoardInstance } from "nestjs-bull-board";

@Controller('my-feature')
export class FeatureController {


  constructor(
    // You can simply inject the bull-board instance using the @Inject decorator and the exported constant.
    @Inject(BULL_BOARD_INSTANCE) private readonly boardInstance: BullBoardInstance
  ) {
  }

  @Get()
  getFeature() {
    // You can do anything from here with the boardInstance for example:

    //this.boardInstance.replaceQueues();
    //this.boardInstance.addQueue();
    //this.boardInstance.setQueues();

    return 'ok';
  }

}