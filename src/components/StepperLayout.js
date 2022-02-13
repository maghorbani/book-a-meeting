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
import { VideoAndDelay } from "./VideoAndDelay";
import { DatePicker } from "./DatePicker";
import { connect } from "react-redux";
import axios from "axios";
import { useDispatch } from "react-redux";
import { sendEmail } from "../actions/emailActions";

const StepperLayout = (props) => {
    const [activeStep, setActiveStep] = React.useState(0);
    const [enableContinue, setenableContinue] = React.useState(false);
    const dispatch = useDispatch();

    const enableContinueWrapper = (isvalid) => {
        setenableContinue(isvalid);
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
        setenableContinue(false);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
        setenableContinue(false);
    };

    const handleReset = () => {
        setActiveStep(0);
        setenableContinue(false);
    };

    return (
        <Box className="md:w-8/12 sm:w-11/12">
            <Stepper
                activeStep={activeStep}
                orientation="vertical"
                className="md:w-8/12 sm:w-11/12"
            >
                <Step>
                    <StepLabel>Enter your email</StepLabel>
                    <StepContent>
                        <Typography sx={{ mb: 2 }}>
                            Please enter your email, so we can reach you latter
                        </Typography>
                        <EmailForm parrentSetIsValid={enableContinueWrapper} />
                        <Box sx={{ my: 2 }}>
                            <div>
                                <Button
                                    disabled={!enableContinue}
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
                    <StepLabel>Just a moment...</StepLabel>
                    <StepContent>
                        <Typography sx={{ mb: 2 }}>
                            Take some time listening to one of the best
                            performances of Sibelius' violin concerto, by Maxim
                            Vengerov
                        </Typography>
                        <VideoAndDelay
                            parrentCanGoNextStep={enableContinueWrapper}
                            delay={2 * 60}
                        />
                        <Box sx={{ mb: 2 }}>
                            <div>
                                <Button
                                    disabled={!enableContinue}
                                    variant="contained"
                                    onClick={handleNext}
                                    sx={{ mt: 1, mr: 1 }}
                                >
                                    Continue
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
                <Step>
                    <StepLabel
                        optional={
                            <Typography variant="caption">Last step</Typography>
                        }
                    >
                        Schedule your meeting
                    </StepLabel>
                    <StepContent>
                        <Typography sx={{ mb: 2 }}>
                            Please Select a time slot and we will send you
                            meeting detail
                        </Typography>
                        <DatePicker />
                        <Box sx={{ my: 2 }}>
                            <div>
                                <Button
                                    // disabled={!enableContinue}
                                    variant="contained"
                                    onClick={() => {
                                        handleNext();
                                        dispatch(sendEmail(props.email));
                                    }}
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
            {activeStep === 3 && (
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
};

const mapStateToProps = (state) => ({
    email: state.email.email,
});

export default connect(mapStateToProps)(StepperLayout);
