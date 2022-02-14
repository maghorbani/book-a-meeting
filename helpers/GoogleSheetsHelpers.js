const { buildErrObject } = require("../routers/middleware");
const { GoogleSpreadsheet } = require("google-spreadsheet");

const updateGoogleSheet = (email, allMeetings, allEmails) => {
    return new Promise(async (resolve, reject) => {
        try {
            const creds = require("../.config/" + process.env.GOOGLE_CRED_FILE);
            const doc = new GoogleSpreadsheet(process.env.GOOGLE_SHEET_ID);
            await doc.useServiceAccountAuth(creds);
            await doc.loadInfo();
            const sheet = await doc.sheetsByIndex[0];
            const rows = await sheet.getRows();
            const sheetEmails = rows.map(function (element) {
                return element.email;
            });
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
            if (allEmails.includes(email)) {
                const ind = allEmails.indexOf(email);
                const rowData = allMeetings[ind];
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
                rows[rowInd]["duration(minutes)"] =
                    sheetRow["duration(minutes)"];
                await rows[rowInd].save();
            } else {
                await sheet.addRow(sheetRow);
            }
            resolve();
        } catch (err) {
            if (process.env.NODE_ENV === "development")
                console.error("Google Error", err);
            reject(buildErrObject(500, "Google Sheet API Error"));
        }
    });
};

module.exports = { updateGoogleSheet };
