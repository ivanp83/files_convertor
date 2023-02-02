export declare namespace AppTypes {
    type AppErrorType = {
        message: string;
        status: string;
    };
    type FileType = {
        size: string;
        filepath: string;
        newFilename: string;
        mimetype: 'image/jpeg';
        mtime: string;
        originalFilename: string;
    };
}
