import React, { useRef, useEffect } from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Grid } from "@material-ui/core";
import steps from "./TipObject"

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    limgdiv:{
        overflow: "hidden",
    },
    limg: {
        maxWidth: "100%",
        height: "auto",

        display: "block",
        padding: "50px 0px"
    },
    typo:{
        "fontFamily": "'카페24 당당해', '맑은 고딕', serif",
        minHeight: 420,
        padding: "50px 20px", 
        whiteSpace: "pre-line",
        display: "table-cell",
        verticalAlign: "middle",
    },
    hname:{
        "fontFamily": "'카페24 당당해', '맑은 고딕', serif",
        width: "100%", 
        textAlign: "center"
    },
    source:{
        textAlign: "right",
        "fontFamily": "'카페24 당당해', '맑은 고딕', serif"
    }
});


const Tips = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const switchRef = useRef();
    const maxSteps = steps.length;
    useEffect(()=>{
        switchRef.current.scrollIntoView({ behavior: 'smooth' });
    },[activeStep]);
    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
    <Box sx={{ 
            mt: 5,
            alignItems: 'center',
            boxShadow: 1,
            fontWeight: 'bold',
        }}>
        <Paper
        square
        elevation={0}
        sx={{
            display: 'flex',
            alignItems: 'center',
            height: 50,
            pl: 2,
            bgcolor: 'background.default',
        }}
        >
        <h5 display="block" className={classes.hname}>{steps[activeStep].label}</h5>
        </Paper>
        <Box sx={{ maxWidth: '100%', minHeight: 300, p: 2 }}>
        <Grid container>
            <Grid continer  xs={4} direction="column">
                <Grid item xs={12}>
                    <div className={classes.limgdiv}>
                        <img alt="complex" src={steps[activeStep].imgsource} className={classes.limg}  />
                    </div>
                </Grid>
                <Grid item xs={12}>
                <Typography className={classes.source}>{"출처: " + steps[activeStep].source}</Typography>
                </Grid>
            </Grid>
            <Grid item xs={8} p = {10}>
                <div style={{paddingLeft: 20, margin: 0}}>
                    <Typography component="pre" className={classes.typo}>
                        {steps[activeStep].description}
                    </Typography>
                </div>
            </Grid>
        </Grid>
        </Box>
        <MobileStepper
        // variant="text"
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
            <Button
            ref = {switchRef}
            color="secondary"
            size="small"
            onClick={handleNext}
            disabled={activeStep === maxSteps - 1}
            >
            Next
            {theme.direction === 'rtl' ? (
                <KeyboardArrowLeft />
                ) : (
                    <KeyboardArrowRight />
                    )}
            </Button>
        }
        backButton={
            <Button size="small" onClick={handleBack} disabled={activeStep === 0} color="secondary">
            
            {theme.direction === 'rtl' ? (
                <KeyboardArrowRight />
            ) : (
                <KeyboardArrowLeft />
            )}
            Back
            </Button>
        }
        />
    </Box>
    );
}

export default Tips;


