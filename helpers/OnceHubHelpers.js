const { buildErrObject, handleAxiosError } = require("../routers/middleware");
const axios = require("axios");

const fetchAllMeetings = () => {
    return new Promise((resolve, reject) => {
        axios
            .get("https://api.oncehub.com/v2/bookings", {
                headers: {
                    "API-Key": process.env.ONCEHUB_API_KEY,
                },
            })
            .then((res) => res.data.data)
            .then((res) => {
                resolve(res);
            })
            .catch((err) => {
                reject(handleAxiosError(err));
            });
    });
};

module.exports = { fetchAllMeetings };
