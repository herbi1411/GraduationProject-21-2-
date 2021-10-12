import React, { useState, useEffect } from "react"
import Highcharts from 'highcharts';
import HighChartsReact from 'highcharts-react-official';

const HighChart = (datas) =>{
    const initialOptions = {
        title: {
            text: "눈 깜빡임 평균 이용 시간",
        },
        // chart: {
        //     type: "bar",
        // },
        yAxis: {
            title:{
                text: "평균 눈깜빡임 시간"
            }
        },
        xAxis:{
            title:{
                text: "일시"
            }
            // accessibility:{
            //     rangeDescription: "Range: 1 to 10 ", 
            // }
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle'
        },
        series : []
    }
    const [options,setOptions] = useState(initialOptions);

    useEffect(()=>{
        saveDatas();
        return () => {
            setOptions(initialOptions);
        }
    },[]);
    const saveDatas = () => {
        setOptions({
            ...options,
            series: [{
                name: "Say Yes",
                // data:[1000,2000,3000,4000,5000],
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

    return (<div>
        <HighChartsReact
            highcharts = {Highcharts}
            options = {options}
        />
    </div>)

}

export default HighChart;