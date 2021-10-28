import React, { useState, useEffect } from "react"
import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';
import { Container } from "@material-ui/core";

const HighChart_AlertLog = (datas) =>{
    const initialOptions = {
        title: {
            text: "알림 횟수",
        },
        chart: {
            type: "column",
            backgroundColor:"#d1d1d1",
            // inverted: true,

        },
        yAxis: {
            title:{
                text: "번",
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
            // type: "bar",
            color: "#34ebb4",
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
            datas.datas.forEach((element,index) => {
                newData.push({
                    // x: element.stime,
                    x: index + 1,
                    y: parseFloat(element.alertCount),
                });
            });
            setOptions({
                ...options,
                series: {
                    name: "알림횟수",
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

export default HighChart_AlertLog;