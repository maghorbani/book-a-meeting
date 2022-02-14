const { handleError } = require("../routers/middleware");
const { fetchAllMeetings } = require("../helpers/OnceHubHelpers");
const SendEmail = async (req, res) => {
    try {
        let meetings = await fetchAllMeetings();
        const emails = meetings.map(function (element) {
            return element["form_submission"]["email"];
        });

        res.status(201).json(meetings);
    } catch (err) {
        handleError(res, err);
    }
};

module.exports = { SendEmail };
