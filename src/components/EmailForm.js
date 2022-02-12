import React from "react";
import Button from "@mui/material/Button";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

class EmailForm extends React.Component {
    state = {
        email: "",
    };

    handleChange = (event) => {
        const email = event.target.value;
        this.setState({ email });
    };

    handleSubmit = () => {
        // your submit logic
    };

    render() {
        const { email } = this.state;
        return (
            <ValidatorForm
                ref="form"
                onSubmit={this.handleSubmit}
                onError={(errors) => console.log(errors)}
                className="w-full"
            >
                <TextValidator
                    fullWidth
                    label="Email"
                    onChange={this.handleChange}
                    name="email"
                    value={email}
                    validators={["required", "isEmail"]}
                    errorMessages={[
                        "this field is required",
                        "email is not valid",
                    ]}
                />
            </ValidatorForm>
        );
    }
}

export default EmailForm;
