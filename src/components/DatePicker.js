import React, { useEffect } from "react";
import { connect } from "react-redux";
// import AdapterDateFns from "@mui/lab/AdapterDateFns";
// import LocalizationProvider from "@mui/lab/LocalizationProvider";
// import DateTimePicker from "@mui/lab/DateTimePicker";
// import MobileDateTimePicker from "@mui/lab/MobileDateTimePicker";
// import { TextField } from "@mui/material";

export const DatePicker = (props) => {
    const [value, setValue] = React.useState(Date.now());

    const handleChange = (newValue) => {
        setValue(newValue);
    };
    useEffect(() => {
        const script = document.createElement("script");

        script.src = "https://cdn.oncehub.com/mergedjs/so.js";
        script.async = true;

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);
    return (
        <div
            id="SOIDIV_mohammadalighorbani"
            data-so-page="mohammadalighorbani"
            data-height="550"
            data-style="border: 1px solid #d8d8d8; min-width: 290px; max-width: 900px;"
            data-psz="00"
        ></div>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
