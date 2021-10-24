import React, { useState, useEffect } from "react"
import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { Container } from "@material-ui/core";

const HighChart = (datas) =>{
    const initialOptions = {
        title: {
            text: "평균 눈깜빡임 간격",
        },
        chart: {
            // type: "bar",
            backgroundColor:"#E6FBE9",
        },
        yAxis: {
            title:{
                text: "초",
                textAlign: "left",
                alighn: "high"
            },
        },
        xAxis:{
            title:{
                text: "번호"
            },
            tickInterval: 1,
            // accessibility:{
            //     rangeDescription: "Range: 1 to 10 ", 
            // }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series : [{
            type: "line",
            color: "#E0A8E9",
        }],
    }
    const [options,setOptions] = useState(initialOptions);

    useEffect(()=>{
        saveDatas();
        return () => {
            setOptions(initialOptions);
        }
    },[]);
    const saveDatas = () => {
        if (datas.datas){
            let newData = [];
            let temp = 1;
            datas.datas.forEach(element => {
                if(parseFloat(element.avg) != "Infinity"){
                    newData.push({
                        // x: element.stime,
                        x: temp,
                        y: parseFloat(element.avg)
                    });
                    temp +=1;
                }
            });
            setOptions({
                ...options,
                series: {
                    name: "평균간격",
                    data: newData,
                }
            });
        }else{
            setOptions({
                ...options,
                series: [{
                    name: "Say Yes",
                    data:[{
                        x: 1,
                        y: 9,
                        name: "Points1"
                    },{
                        x: 2,
                        y: 30,
                        name: "Points2"
                    },{
                        x: 3,
                        y: 21,
                        name: "Points3"
                    },{
                        x: 4,
                        y: 40,
                        name: "Points4"
                    },{
                        x: 5,
                        y: 55,
                        name: "Points5"
                    },
                    ]
                }]       
            });
        }
    }

    return (
    <div style={{marginTop : "5%"}}>
        <HighChartsReact
            highcharts = {Highcharts}
            options = {options}
        />
    </div>
    )

}

export default HighChart;