import { SET_EMAIL, SENT_EMAIL } from "./types";
import axios from "axios";

export const setEmail = (email) => (dispatch) => {
    dispatch({
        type: SET_EMAIL,
        payload: email,
    });
};

export const sendEmail = (email) => (dispatch) => {
    axios
        .post(`${process.env.REACT_APP_BACK_END_URL || ""}/api/sendEmail`, {
            email: email,
        })
        .then((res) => {})
        .catch((err) => console.error(err));
};
