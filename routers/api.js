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
        const rows = await sheet.getRows();
        const sheetEmails = rows.map(function (element) {
            return element.email;
        });
        const emails = oncehub_resp.data.data.map(function (element) {
            return element["form_submission"]["email"];
        });

        const data = {
            contactAutomation: {
                contact: "0",
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
            sheetRow["join url"] = rowData.virtual_conferencing.join_url;
            const d = new Date(rowData.starting_time);
            sheetRow["start time"] = d.toUTCString();
            sheetRow["duration(minutes)"] = rowData.duration_minutes;
        }
        if (sheetEmails.includes(email)) {
            const rowInd = sheetEmails.indexOf(email);
            rows[rowInd].name = sheetRow.name;
            rows[rowInd].email = sheetRow.email;
            rows[rowInd].phone = sheetRow.phone;
            rows[rowInd]["mobile phone"] = sheetRow["mobile phone"];
            rows[rowInd].note = sheetRow.note;
            rows[rowInd].company = sheetRow.company;
            rows[rowInd].note = sheetRow.note;
            rows[rowInd]["join url"] = sheetRow["sjoin url"];

            rows[rowInd]["start time"] = sheetRow["start time"];
            rows[rowInd]["duration(minutes)"] = sheetRow["duration(minutes)"];
            await rows[rowInd].save();
        } else {
            await sheet.addRow(sheetRow);
        }
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
        data.contactAutomation.contact = id;

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
