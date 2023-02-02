export namespace AppTypes {
  export type AppErrorType = {
    message: string;
    status: string;
  };
  export type FileType = {
    size: string;
    filepath: string;
    newFilename: string;
    mimetype: 'image/jpeg';
    mtime: string;
    originalFilename: string;
  };
}
