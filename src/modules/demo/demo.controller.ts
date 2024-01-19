import { Controller, Res, HttpStatus, Post, UploadedFile } from "@nestjs/common";
import { DemoService } from "./demo.service";
import { Response } from "express";
import { ApiFile } from "../../decorators";
import { ParseFile } from "../../pipes";

@Controller({ path: "demo", version: "1" })
export class DemoController {
    constructor(private readonly demoService: DemoService) {}

    @Post("echo")
    @ApiFile("file")
    async echo(@UploadedFile(ParseFile) file: Express.Multer.File, @Res() res: Response) {
        const result = await this.demoService.echo(file);

        return res.status(HttpStatus.OK).json({
            message: "record created successfully",
            data: result,
            statusCode: HttpStatus.OK,
        });
    }

    @Post("multiply")
    @ApiFile("file")
    async multiply(@UploadedFile(ParseFile) file: Express.Multer.File, @Res() res: Response) {
        const result = await this.demoService.multiply(file);

        return res.status(HttpStatus.OK).json({
            message: "record created successfully",
            data: result,
            statusCode: HttpStatus.OK,
        });
    }

    @Post("sum")
    @ApiFile("file")
    async sum(@UploadedFile(ParseFile) file: Express.Multer.File, @Res() res: Response) {
        const result = await this.demoService.sum(file);

        return res.status(HttpStatus.OK).json({
            message: "record created successfully",
            data: result,
            statusCode: HttpStatus.OK,
        });
    }
}
