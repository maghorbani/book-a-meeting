import { ACTION_1 } from "../actions/types";

const initialState = {
    items: [],
    item: {},
};

function sampleReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_1:
            return {
                ...state,
                items: action.payload,
            };
        default:
            return state;
    }
}

export default sampleReducer;
