var express = require("express");
var router = express.Router();
var axios = require("axios");
const trimRequest = require("trim-request");
const { ValidateSendEmail } = require("./validators");

const { GoogleSpreadsheet } = require("google-spreadsheet");
const { SendEmail } = require("../controllers");

router.post("/sendEmail", trimRequest.all, ValidateSendEmail, SendEmail);

module.exports = router;
