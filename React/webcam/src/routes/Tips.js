import React, { useRef, useEffect } from "react";
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
        padding: "50px 0px"
    },
    typo:{
        "fontFamily": "'카페24 당당해', '맑은 고딕', serif",
        minHeight: 420,
        padding: "50px 20px", 
        whiteSpace: "pre-line",
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

const steps = [
  {
    imgsource: "/img/unnamed.jpg",
    label: '눈건강 운동',
    description: `1. 회전 - 눈을 천천히 시계 방향으로 회전하고 잠시 쉬었다가 시계 반대 방향으로 회전한다.
    
    2. 지압 - 눈을 감은 상태에서 손가락으로 눈 위를 2초동안 가볍게 누르는 동작을 10회 반복한다.
    
    3. 위아래 - 천천히 눈을 위아래 각각 5초간 유지하고 이어 정면을 바라보는 동작을 10횝 반복한다.
    
    4. 좌우 - 천천히 눈을 좌우로 각각 5초간 유지하고 이어 정면을 바라보는 동작을 10회 반복한다`,
    source: "https://www.nhis.or.kr",
  },
  {
    imgsource: '/img/eye3(2).jpg',
    label: '눈 건강에 좋은 영양소와 식품',
    description:
      `1. 비타민 A & 베타카로틴
      비타민A는 건강한 시력에 필수적인 영양소입니다. 베타카로틴은 비타민A의 전구체로 항산화 역할을 하며 백내장 및 노인기 황반변성 등을 예방하는 효과가 있습니다. 비타민A가 결핍되면 어두운 곳에서의 적응반응이 느려지는 야맹증이 생길 수 있습니다. 비타민A의 급원 식품으로는 달걀, 생선 기름, 동물의 간 등이 있고, 베타카로틴은 당근, 케일, 시금치, 토마토, 단호박, 고구마, 살구 등에 풍부하게 들어있습니다. 다만 베타카로틴을 별도의 보충제로 복용하는 것은 흡연자에서 폐암 발생의 위험성을 증가시킬 수 있으므로 주의가 필요합니다.
      
      2. 비타민 E
      비타민E는 지용성 비타민으로, 강력한 항산화기능을 하여 세포를 보호하는 효과가 있습니다. 옥수수유, 올리브유, 대두유와 같은 식물성 기름과, 해바라기씨, 호두, 아몬드, 땅콩 등의 견과류 등에 풍부하게 함유되어 있습니다.
      
      3. 아연
      아연은 망막의 건강 유지에 중요한 역할을 하는 무기질로 눈의 대사에 필수적인 영양소입니다. 항산화제 역할을 하여 노인기 황반변성과 백내장을 예방하고 면역기능을 향상시킵니다. 급원 식품으로는 해산물(굴, 게)과 고기류(돼지고기, 닭고기, 소고기)와 콩류에 풍부하게 함유되어 있습니다.
      
      4. 안토시아닌
      항산화 기능이 뛰어난 안토시아닌이 풍부한 블루베리는 슈퍼푸드 중 하나로 눈 건강에 좋은 식품으로도 꼽힙니다. 블루베리, 가지 등 보라색 과일, 채소에 풍부한 안토시아닌은 강한 항산화작용으로 망막을 보호할 가능성이 있습니다.
      
      5. 루테인
      루테인은 눈으로 들어오는 빛, 특히 청색광을 걸러주는 필터의 기능을 하고 항산화 작용을 합니다. 비타민 C, E, 아연, 구리와 함께 연령관련황반변성의 진행을 억제하는 효과가 있음이 임상적으로 입증되었습니다. 하지만 눈에서 합성되지 않으므로 평소에 루테인이 풍부한 식품섭취로 보충해주는 것이 좋습니다. 루테인은 시금치, 브로콜리, 케일 등의 푸른 채소와 옥수수, 단호박, 감귤류에도 풍부하게 들어있습니다.',
      `,  
      source: "http://www.samsunghospital.com"
  },
  {
    imgsource: "/img/ceyes.png",
    label: '안구건조증 예방법',
    description: `    안구건조증 예방을 위해서는 눈에 무리가 가는 행동을 삼가야 합니다. 장시간 동안 TV를 시청하거나 독서를 할 때는 중간중간 먼 곳을 바라봐 눈에 피로가 쌓이지 않도록 해야 합니다. 
    
    컴퓨터 작업이나 스마트폰 사용 역시 눈을 쉽게 피로하게 합니다.
    
    컴퓨터나 스마트폰 사용 시에는 1시간 사용 후 10분간 휴식을 취하거나 밝기를 적절히 유지하는 등의 방법이 도움됩니다. 
    
    건조한 환경도 안구건조증을 유발할 수 있습니다. 
    
    전문가들은 안구건조증 예방을 위해 실내 습도를 60% 정도로 유지하고, 하루에 2L 이상 물을 마시는 것을 권장합니다.`,
    source: "https://brunch.co.kr/@kpf10/325"
  },
];


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
        <h5 display="block" className={classes.hname}>{steps[activeStep].label}</h5>
        </Paper>
        {/* <Box sx={{ height: 255, maxWidth: 400, width: '100%', p: 2 }}> */}
        <Box sx={{ maxWidth: '100%', minHeight: 300, p: 2 }}>
        <Grid container>
            <Grid continer  xs={4} direction="column">
                <Grid item xs={12}>
                    {/* <p style={{padding: 20, margin: 0}}>
                        {steps[activeStep].description}
                    </p> */}
                    {/* <ButtonBase sx={{ width: 40, height: 40 }}> */}
                    <div className={classes.limgdiv}>
                        <img alt="complex" src={steps[activeStep].imgsource} className={classes.limg}  />
                    </div>
                    {/* </ButtonBase> */}
                    {/* <img src="/img/ceyes.png"/> */}
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


