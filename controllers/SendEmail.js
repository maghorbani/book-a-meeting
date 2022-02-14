const { handleError } = require("../routers/middleware");

const SendEmail = async (req, res) => {
    try {
        res.status(201).json({
            message: "hello",
        });
    } catch (err) {
        handleError(res, err);
    }
};

module.exports = { SendEmail };
