import React from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import validator from "validator";

function EmailForm(props) {
    const [email, setEmail] = React.useState("");
    const [isValid, setIsValid] = React.useState(false);

    const handleChange = (event) => {
        // console.log(parentIsValid);
        const email = event.target.value;
        const emailValie = validator.isEmail(email);
        setIsValid(emailValie);
        setEmail(email);
        props.parrentSetIsValid(emailValie);
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
}

export default EmailForm;
