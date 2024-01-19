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

    async multiply(file: Express.Multer.File): Promise<number> {
        return new Promise((resolve) => {
            if (!file || !file.buffer) {
                throw new HttpException("Invalid CSV file", HttpStatus.BAD_REQUEST);
            }

            const csvData: number[][] = [];
            const fileContent = file.buffer.toString();

            // Parse CSV content
            parse(fileContent, { cast: true, columns: false }, (err, data) => {
                if (err) {
                    console.error("Error parsing CSV content:", err);
                    throw new HttpException("Error parsing CSV content", HttpStatus.INTERNAL_SERVER_ERROR);
                }

                data.forEach((row) => {
                    const numericRow = row.map(Number);
                    csvData.push(numericRow);
                });

                // Calculate the product of integers in the matrix
                const product = csvData.flat().reduce((acc, val) => acc * val, 1);

                // Resolve with the product
                resolve(product);
                console.log(`Matrix Output: ${product}`);
            });
        });
    }

    async sum(file: Express.Multer.File): Promise<number> {
        return new Promise((resolve) => {
            if (!file || !file.buffer) {
                throw new HttpException("Invalid CSV file", HttpStatus.BAD_REQUEST);
            }
    
            const csvData: number[][] = [];
            const fileContent = file.buffer.toString();
    
            // Parse CSV content
            parse(fileContent, { cast: true, columns: false }, (err, data) => {
                if (err) {
                    console.error("Error parsing CSV content:", err);
                    throw new HttpException("Error parsing CSV content", HttpStatus.INTERNAL_SERVER_ERROR);
                }
    
                data.forEach((row) => {
                    const numericRow = row.map(Number);
                    csvData.push(numericRow);
                });
    
                // Calculate the sum of integers in the matrix
                const sum = csvData.flat().reduce((acc, val) => acc + val, 0);
    
                // Resolve with the sum
                resolve(sum);
                console.log(`Matrix Output: ${sum}`);
            });
        });
    }
}
