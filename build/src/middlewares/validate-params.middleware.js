"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const formidable = require('formidable');
const validateParams = (req, res, next) => {
    const form = formidable({ multiples: true });
    //???????
    form.parse(req, (err, fields, files) => {
        if (err) {
            res.writeHead(err.httpCode || 400, { 'Content-Type': 'text/plain' });
            res.end(String(err));
            return;
        }
    });
    next();
};
// const validateParams = (requestParams) => {
//   return function validateParams(req, res, next) {
//     for (let param of requestParams) {
//       if (checkParamPresent(Object.keys(req.body), param)) {
//         let reqParam = req.body[param.param_key];
//         if (!checkParamType(reqParam, param)) {
//           return res.status(400).send({
//             result:
//               `${param.param_key} is of type ` +
//               `${typeof reqParam} but should be ${param.type}`,
//           });
//         } else {
//           if (!runValidators(reqParam, param)) {
//             return res.status(400).send({
//               result: `Validation failed for ${param.param_key}`,
//             });
//           }
//         }
//       } else if (param.required) {
//         return res.status(400).send({
//           result: `Missing Parameter ${param.param_key}`,
//         });
//       }
//     }
//     next();
//   };
// };
module.exports = { validateParams };
//# sourceMappingURL=validate-params.middleware.js.map