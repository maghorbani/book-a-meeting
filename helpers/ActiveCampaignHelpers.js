const { handleAxiosError } = require("../routers/middleware");
const axios = require("axios");

const createNewContact = (email) => {
    return new Promise((resolve, reject) => {
        axios
            .post(
                process.env.CAMPAIGN_URL + "contacts",
                {
                    contact: { email },
                },
                {
                    headers: {
                        "API-Key": process.env.ONCEHUB_API_KEY,
                    },
                }
            )
            .then((res) => res.data.contact)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(handleAxiosError(err));
            });
    });
};

const addContactToAutomation = (contactId) => {
    return new Promise((resolve, reject) => {
        const data = {
            contactAutomation: {
                contact: contactId,
                automation: "2",
            },
        };
        if (emails.includes(email)) {
            data.contactAutomation.automation = "1";
        }
        axios
            .post(process.env.CAMPAIGN_URL + "contactAutomations", data, {
                headers: {
                    "API-Key": process.env.ONCEHUB_API_KEY,
                },
            })
            .then((res) => res.data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(handleAxiosError(err));
            });
    });
};

module.exports = { createNewContact, addContactToAutomation };
