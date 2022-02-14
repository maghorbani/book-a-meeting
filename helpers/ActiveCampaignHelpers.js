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
                        "API-Token": process.env.CAMPAIGN_API_TOKEN,
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

const addContactToAutomation = (contactId, booked) => {
    return new Promise((resolve, reject) => {
        const data = {
            contactAutomation: {
                contact: contactId,
                automation: "2",
            },
        };
        if (booked) {
            data.contactAutomation.automation = "1";
        }
        axios
            .post(process.env.CAMPAIGN_URL + "contactAutomations", data, {
                headers: {
                    "API-Token": process.env.CAMPAIGN_API_TOKEN,
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
