import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import EmailForm from "./EmailForm";

const steps = [
    {
        label: "Enter Email",
        description: `Please enter your email, so we can reach you latter`,
        component: <EmailForm />,
    },
    {
        label: "Create an ad group",
        description:
            "An ad group contains one or more ads which target a shared set of keywords.",
        component: "",
    },
    {
        label: "Create an ad",
        description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
        component: "",
    },
];

export default function StepperLayout() {
    const [activeStep, setActiveStep] = React.useState(0);
    const [emailIsValid, setEmailIsValid] = React.useState(false);

    const validateEmailWrapper = (isvalid) => {
        setEmailIsValid(isvalid);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
    };

    return (
        <Box sx={{ maxWidth: 400 }}>
            <Stepper activeStep={activeStep} orientation="vertical">
                <Step>
                    <StepLabel>Enter Email</StepLabel>
                    <StepContent>
                        <Typography sx={{ mb: 2 }}>
                            Please enter your email, so we can reach you latter
                        </Typography>
                        <EmailForm parrentSetIsValid={validateEmailWrapper} />
                        <Box sx={{ my: 2 }}>
                            <div>
                                <Button
                                    disabled={!emailIsValid}
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
                                </Button>
                                <Button
                                    disabled={true}
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
                <Step>
                    <StepLabel
                        optional={
                            <Typography variant="caption">Last step</Typography>
                        }
                    >
                        "Create an ad group"
                    </StepLabel>
                    <StepContent>
                        <Typography>
                            "An ad group contains one or more ads which target a
                            shared set of keywords."
                        </Typography>

                        <Box sx={{ mb: 2 }}>
                            <div>
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Finish
                                </Button>
                                <Button
                                    onClick={handleBack}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Back
                                </Button>
                            </div>
                        </Box>
                    </StepContent>
                </Step>
            </Stepper>
            {activeStep === steps.length && (
                <Paper square elevation={0} sx={{ p: 3 }}>
                    <Typography>
                        All steps completed - you&apos;re finished
                    </Typography>
                    <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
                        Reset
                    </Button>
                </Paper>
            )}
        </Box>
    );
}
