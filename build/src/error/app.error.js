"use strict";
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode !== null && statusCode !== void 0 ? statusCode : '';
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = AppError;
//# sourceMappingURL=app.error.js.map