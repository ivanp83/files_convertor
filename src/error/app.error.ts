class AppError extends Error {
<<<<<<< HEAD
  statusCode: string | number;
  status: string | undefined;
=======
  //?????????????
  statusCode: string|number;
  status: string|undefined;
>>>>>>> 98db5e9bfa36f05703941a99e9e3934d6a8c4193

  constructor(message: string, statusCode: number) {
    super(message);

    this.statusCode = statusCode ?? '';
<<<<<<< HEAD
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
=======
    this.status = `${statusCode}`.startsWith("4") ? "fail" : "error";
>>>>>>> 98db5e9bfa36f05703941a99e9e3934d6a8c4193

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;
