const handleError = (res = {}, err = {}) => {
    if (process.env.NODE_ENV === "development") {
        console.log(err);
    }
    code = err.code || 500;
    if (!err.code || err.code > 599) err.message = "Internal Server Error";
    res.status(code < 600 ? code : 500).json({
        errors: {
            msg: err.message,
        },
    });
};

module.exports = { handleError };
