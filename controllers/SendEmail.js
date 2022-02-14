const { handleError } = require("../routers/middleware");
const { fetchAllMeetings } = require("../helpers/OnceHubHelpers");
const { updateGoogleSheet } = require("../helpers/GoogleSheetsHelpers");
const {
    createNewContact,
    addContactToAutomation,
} = require("../helpers/ActiveCampaignHelpers");
const SendEmail = async (req, res) => {
    try {
        const email = req.body.email;
        const meetings = await fetchAllMeetings();
        const emails = meetings.map(function (element) {
            return element["form_submission"]["email"];
        });
        await updateGoogleSheet(email, meetings, emails);
        const contact = await createNewContact(email);
        await addContactToAutomation(contact.id);
        res.status(201).json({
            message: "new contact added to automated email",
        });
    } catch (err) {
        handleError(res, err);
    }
};

module.exports = { SendEmail };
