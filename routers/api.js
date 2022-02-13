var express = require("express");
var router = express.Router();
var axios = require("axios");
const { GoogleSpreadsheet } = require("google-spreadsheet");

router.post("/sendEmail", async function (req, res, next) {
    const email = req.body.email;
    try {
        let oncehub_resp = await axios.get(
            "https://api.oncehub.com/v2/bookings",
            {
                headers: {
                    "API-Key": process.env.ONCEHUB_API_KEY,
                },
            }
        );

        const creds = require("../.config/" + process.env.GOOGLE_CRED_FILE);
        const doc = new GoogleSpreadsheet(
            "1mUWQ3zWHDbOHrV308sheHdU6T__S_mpGvUzdvDpKeC8"
        );

        await doc.useServiceAccountAuth(creds);

        await doc.loadInfo();

        const sheet = await doc.sheetsByIndex[0];
        // const rows = await sheet.getRows();

        const emails = oncehub_resp.data.data.map(function (element) {
            return element["form_submission"]["email"];
        });

        let crate_contact = await axios.post(
            process.env.CAMPAIGN_URL + "contacts",
            {
                contact: { email: email },
            },
            {
                headers: {
                    "api-token": process.env.CAMPAIGN_API_TOKEN,
                },
            }
        );
        const id = crate_contact.data.contact.id;
        const data = {
            contactAutomation: {
                contact: id,
                automation: "2",
            },
        };
        sheetRow = {
            email: email,
            name: "",
            phone: "",
            "mobile phone": "",
            note: "",
            company: "",
            guests: "",
            "join url": "",
            "start time": "",
            "duration(minutes)": "",
        };
        if (emails.includes(email)) {
            data.contactAutomation.automation = "1";
            const ind = emails.indexOf(email);
            const rowData = oncehub_resp.data.data[ind];
            sheetRow.name = rowData.form_submission.name;
            sheetRow.email = rowData.form_submission.email;
            sheetRow.phone = rowData.form_submission.phone;
            sheetRow["mobile phone"] = rowData.form_submission.mobile_phone;
            sheetRow.note = rowData.form_submission.note;
            sheetRow.company = rowData.form_submission.company;
            sheetRow.note = rowData.form_submission.note;
            sheetRow["sjoin url"] = rowData.virtual_conferencing.join_url;
            sheetRow["start time"] = rowData.starting_time;
            sheetRow["duration(minutes)"] = rowData.duration_minutes;
        }
        await sheet.addRow(sheetRow);
        let add_to_automation = await axios.post(
            process.env.CAMPAIGN_URL + "contactAutomations",
            data,
            {
                headers: {
                    "api-token": process.env.CAMPAIGN_API_TOKEN,
                },
            }
        );

        res.json(add_to_automation.data);
    } catch (error) {
        console.log(error.response.data);
        res.json("");
    }
});

module.exports = router;
