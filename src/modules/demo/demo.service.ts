import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { parse } from "csv";

@Injectable()
export class DemoService {
    constructor() {}

    async echo(file: Express.Multer.File): Promise<string> {
        return new Promise(async (resolve) => {
            if (!file || !file.buffer) {
                throw new HttpException("Invalid CSV file", HttpStatus.BAD_REQUEST);
            }

            const csvData: number[][] = [];
            const fileContent = file.buffer.toString();

            // Parse CSV content
            parse(fileContent, { cast: true, columns: false }, async (err, data) => {
                if (err) {
                    console.error("Error parsing CSV content:", err);
                    throw new HttpException("Error parsing CSV content", HttpStatus.INTERNAL_SERVER_ERROR);
                }

                data.forEach((row) => {
                    const numericRow = row.map(Number);
                    csvData.push(numericRow);
                });

                // Convert the matrix to a string in matrix format
                const matrixString = csvData.map((row) => row.join(",")).join("\n");

                // Resolve with the matrix string
                resolve(matrixString);

                console.log(`Matrix result:`);
                console.log(matrixString);
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

    async flatten(file: Express.Multer.File): Promise<string> {
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

                // Flatten the matrix and create a one-line string
                const flatten = csvData.flat().join(",");

                // Resolve with the matrix string
                resolve(flatten);
                console.log(`Matrix Output: ${flatten}`);
            });
        });
    }

    async invert(file: Express.Multer.File): Promise<string> {
        return new Promise(async (resolve) => {
            if (!file || !file.buffer) {
                throw new HttpException("Invalid CSV file", HttpStatus.BAD_REQUEST);
            }

            const csvData: number[][] = [];
            const fileContent = file.buffer.toString();

            // Parse CSV content
            parse(fileContent, { cast: true, columns: false }, async (err, data) => {
                if (err) {
                    console.error("Error parsing CSV content:", err);
                    throw new HttpException("Error parsing CSV content", HttpStatus.INTERNAL_SERVER_ERROR);
                }

                data.forEach((row) => {
                    const numericRow = row.map(Number);
                    csvData.push(numericRow);
                });

                // Transpose the matrix
                try {
                    const transposedMatrix = await this.transposeMatrix(csvData);

                    // Convert the transposed matrix to a string
                    const matrixString = transposedMatrix.map((row) => row.join(",")).join("\n");

                    // Resolve with the matrix string
                    resolve(matrixString);

                    console.log(`Matrix result:`);
                    console.log(matrixString);
                } catch (error) {
                    throw error;
                }
            });
        });
    }

    private async transposeMatrix(matrix: number[][]): Promise<number[][]> {
        return matrix[0].map((_, colIndex) => matrix.map((row) => row[colIndex]));
    }
}
