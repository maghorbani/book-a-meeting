const { buildErrObject } = require("./buildErrObject");

const handleAxiosError = (errorObj) => {
    if (process.env.NODE_ENV === "development") {
        if (errorObj.response) {
            console.log(errorObj.response.data);
            console.log(errorObj.response.status);
            console.log(errorObj.response.headers);
        } else if (errorObj.request) {
            console.log(errorObj.request);
        }
    }
    return buildErrObject(400, errorObj.message);
};

module.exports = { handleAxiosError };
