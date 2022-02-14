const { validateResult } = require("./validateResult");
const { handleError } = require("./handleError");
const { handleAxiosError } = require("./handleAxiosError");
const { buildErrObject } = require("./buildErrObject");

module.exports = {
    validateResult,
    handleError,
    buildErrObject,
    handleAxiosError,
};
