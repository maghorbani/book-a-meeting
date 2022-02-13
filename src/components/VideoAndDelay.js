import { Chip, LinearProgress, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { connect } from "react-redux";

export const VideoAndDelay = (props) => {
    const [progress, setProgress] = React.useState(0);
    const [timeLeft, setTimeLeft] = React.useState(props.delay);

    useEffect(() => {
        const timer =
            timeLeft >= 0
                ? setTimeout(() => {
                      console.log(timeLeft);
                      setProgress(100 - (timeLeft / props.delay) * 100);
                      if (timeLeft > 0) setTimeLeft(timeLeft - 1);
                      else props.parrentCanGoNextStep(true);
                  }, 1000)
                : 0;
        return () => clearTimeout(timer);
    });

    return (
        <>
            <div className="aspect-w-16 aspect-h-9">
                <iframe
                    src="https://www.youtube.com/embed/YsbrRAgv1b4?start=35"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                ></iframe>
            </div>
            <LinearProgress
                className="my-5 mx-0"
                variant="determinate"
                value={progress}
            />
            <Typography>
                {`${Math.floor(timeLeft / 60)}`.padStart(2, "0")}:
                {`${timeLeft % 60}`.padStart(2, "0")}
            </Typography>
        </>
    );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(VideoAndDelay);
