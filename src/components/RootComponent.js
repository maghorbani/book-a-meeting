import { Button, TextField } from "@mui/material";

function RootComponent() {
    return (
        <div className="w-1/3 p-4 flex flex-col items-start justify-center rounded-lg bg-white">
            <h5 className="mb-10">
                Please Enter Your email address so we can book a time for you
            </h5>
            <form className="w-full">
                <div className="w-full flex flex-col justify-evenly items-end">
                    <TextField
                        className="w-full mb-10"
                        label="your email address"
                        variant="outlined"
                    />
                    <div className="py-5">
                        <Button variant="contained">Continue</Button>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default RootComponent;
