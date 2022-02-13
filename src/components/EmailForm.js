import React from "react";
import { setEmail } from "../actions/emailActions";
import { TextField } from "@mui/material";
import validator from "validator";
import { useDispatch } from "react-redux";

export const EmailForm = (props) => {
    const [email, setStateEmail] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);

    const dispatch = useDispatch();
    const handleChange = (event) => {
        const email = event.target.value;
        const emailIsValid = validator.isEmail(email);
        setIsValid(emailIsValid);
        setStateEmail(email);
        props.parrentSetIsValid(emailIsValid);
        if (emailIsValid) {
            dispatch(setEmail(email));
        }
    };

    const TextFieldError = !(isValid || email === "");
    return (
        <TextField
            error={TextFieldError}
            helperText={
                !(isValid || email === "") ? "Email is Not Valid" : null
            }
            fullWidth
            label="Email"
            onChange={handleChange}
            name="email"
            value={email}
        />
    );
};

export default EmailForm;
