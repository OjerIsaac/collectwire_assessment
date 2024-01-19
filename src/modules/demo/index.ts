import { Module } from "@nestjs/common";
import { DemoService } from "./demo.service";
import { DemoController } from "./demo.controller";

@Module({
    imports: [],
    controllers: [DemoController],
    providers: [DemoService],
    exports: [],
})
export class DemoModule {}
