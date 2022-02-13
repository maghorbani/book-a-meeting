var express = require("express");
var router = express.Router();
var axios = require("axios");

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
        if (emails.includes(email)) {
            data.contactAutomation.automation = "1";
        }
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
        console.log(error);
        res.send(error.response.data);
    }
});
/* GET home page. */
router.post("/contacts", async function (req, res, next) {
    console.log(req.body);
    axios
        .post(process.env.CAMPAIGN_URL + "contacts", req.body, {
            headers: {
                "api-token": process.env.CAMPAIGN_API_TOKEN,
            },
        })
        .then((data) => {
            res.json(data.data);
        })
        .catch((err) => res.status(401).json({ message: err.message }));
});

module.exports = router;
