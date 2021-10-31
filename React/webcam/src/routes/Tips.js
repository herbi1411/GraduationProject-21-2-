import React from "react";
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import MobileStepper from '@mui/material/MobileStepper';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { ButtonBase } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import { Grid } from "@material-ui/core";

import {makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles({
    limgdiv:{
        overflow: "hidden",
    },
    limg: {
        maxWidth: "100%",
        height: "auto",
        display: "block",
    },
});

const steps = [
  {
    label: 'Select campaign settings',
    description: `    Try out different ad text to see what brings in the most customers,
    and learn how to enhance your ads using features like ad extensions.
    If you run into any problems with your ads, find out how to tell if
    they're running and how to resolve approval issues.




    Try out different ad text to see what brings in the most customers,
    and learn how to enhance your ads using features like ad extensions.
    If you run into any problems with your ads, find out how to tell if
    they're running and how to resolve approval issues.
    Try out different ad text to see what brings in the most customers,
    and learn how to enhance your ads using features like ad extensions.
    If you run into any problems with your ads, find out how to tell if
    they're running and how to resolve approval issues.
    Try out different ad text to see what brings in the most customers,
    and learn how to enhance your ads using features like ad extensions.
    If you run into any problems with your ads, find out how to tell if
    they're running and how to resolve approval issues.`,
  },
  {
    label: 'Create an ad group',
    description:
      'An ad group contains one or more ads which target a shared set of keywords.',
  },
  {
    label: 'Create an ad',
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];


const Tips = () => {
    const classes = useStyles();
    const theme = useTheme();
    const [activeStep, setActiveStep] = React.useState(0);
    const maxSteps = steps.length;

    const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    return (
    <Box sx={{ 
            mt: 5,
            // maxWidth: "100%", 
            // flexGrow: 1,
            // display: 'flex',
            // flexDirection: { xs: 'column', md: 'row' },
            alignItems: 'center',
            // bgcolor: 'background.paper',
            // overflow: 'hidden',
            // borderRadius: '12px',
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
        {/* <Typography variant = "h5" align="center" sx={{display: "block"}}>{steps[activeStep].label}</Typography> */}
        <h5 display="block" style = {{width: "80%", textAlign: "center"}}>{steps[activeStep].label}</h5>
        </Paper>
        {/* <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}> */}
        <Box sx={{ maxWidth: '100%', minHeight: 500, p: 2 }}>
        <Grid container>
            <Grid item xs={4}>
                {/* <p style={{padding: 20, margin: 0}}>
                    {steps[activeStep].description}
                </p> */}
                {/* <ButtonBase sx={{ width: 40, height: 40 }}> */}
                <div className={classes.limgdiv}>
                    <img alt="complex" src="/img/ceyes.png" className={classes.limg}  />
                </div>
                {/* </ButtonBase> */}
                {/* <img src="/img/ceyes.png"/> */}
            </Grid>
            <Grid item xs={8} p = {10}>
                <div style={{paddingLeft: 20, margin: 0}}>
                    <Typography component="pre">
                        {steps[activeStep].description}
                    </Typography>
                </div>
            </Grid>
        </Grid>
        {/* {steps[activeStep].description} */}
        </Box>
        <MobileStepper
        // variant="text"
        variant="dots"
        steps={maxSteps}
        position="static"
        activeStep={activeStep}
        nextButton={
            <Button
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


