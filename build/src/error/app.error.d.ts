declare class AppError extends Error {
    statusCode: string | number;
    status: string | undefined;
    constructor(message: string, statusCode: number);
}
