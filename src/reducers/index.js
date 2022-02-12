import { combineReducers } from "redux";
import emailReducer from "./emailReducer";

export default combineReducers({
    email: emailReducer,
});
