import { SET_EMAIL } from "./types";

export const setEmail = (email) => (dispatch) => {
    dispatch({
        type: SET_EMAIL,
        payload: email,
    });
};
