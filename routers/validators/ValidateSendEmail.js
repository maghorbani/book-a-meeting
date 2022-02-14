const { validateResult } = require("../middleware");
const { check } = require("express-validator");

/**
 * Validates register request
 */
const ValidateSendEmail = [
    check("email")
        .exists()
        .withMessage("MISSING")
        .not()
        .isEmpty()
        .withMessage("IS_EMPTY")
        .isEmail()
        .withMessage("EMAIL_IS_NOT_VALID"),
    (req, res, next) => {
        validateResult(req, res, next);
    },
];

module.exports = { ValidateSendEmail };
