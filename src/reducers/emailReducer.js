import { SET_EMAIL } from "../actions/types";

const initialState = {
    email: "",
};

function emailReducer(state = initialState, action) {
    switch (action.type) {
        case SET_EMAIL:
            return {
                email: action.payload,
            };
        default:
            return state;
    }
}

export default emailReducer;
