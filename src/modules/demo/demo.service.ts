import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { parse } from "csv";

@Injectable()
export class DemoService {
    constructor() {}

    async echo(file: Express.Multer.File): Promise<string> {
        return new Promise((resolve) => {
            if (!file || !file.buffer) {
                throw new HttpException("Invalid CSV file", HttpStatus.BAD_REQUEST);
            }

            const csvData: string[] = [];
            const fileContent = file.buffer.toString();

            // Parse CSV content
            let isFirstRow = true;
            parse(fileContent, { columns: true })
                .on("data", (row) => {
                    // console.log('CSV Row:', row);
                    const rowString = Object.values(row).join(",");
                    if (isFirstRow) {
                        // Add the first row to the beginning of the array
                        csvData.push(Object.keys(row).join(","));
                        isFirstRow = false;
                    }
                    csvData.push(rowString);
                })
                .on("end", () => {
                    // Resolve with the matrix string
                    const matrixString = csvData.join("\n");
                    console.log(`Matrix result:`);
                    console.log(matrixString);

                    resolve(matrixString);
                })
                .on("error", (err) => {
                    console.error("Error parsing CSV content:", err);
                    throw new HttpException("Error parsing CSV content", HttpStatus.INTERNAL_SERVER_ERROR);
                });
        });
    }
}
