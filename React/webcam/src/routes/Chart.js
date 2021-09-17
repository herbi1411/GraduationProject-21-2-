import React, { useState, useEffect } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead"
import TableBody from "@material-ui/core/TableBody"
import { dbService } from "fbase";
const Chart = ({userObj}) => {

    const [logs, setLogs] = useState(null);

    const getLogs = async() =>{

        let logContainer = [];
        dbService.collection("log").where("uid","==",userObj.uid).orderBy("blinkAt","asc").get().then((querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                const docObject = {
                    id: doc.id,
                    ...doc.data(),
                };
                logContainer.push(docObject);
            });
            setLogs(logContainer);
        });
    }
    useEffect(()=>{
        getLogs();
    },[]);
    

    const makeDateArray = (dval) => {
        const date = new Date();
        date.setTime(dval);

        const year = date.getFullYear().toString();

        let month = date.getMonth() + 1;
        month = month < 10 ? '0' + month.toString() : month.toString();

        let day = date.getDate();
        day = day < 10 ? '0' + day.toString() : day.toString();

        let hour = date.getHours();
        hour = hour < 10 ? '0' + hour.toString() : hour.toString();

        let minute = date.getMinutes();
        minute = minute < 10 ? '0' + minute.toString() : minute.toString();

        let second = date.getSeconds();
        second = second < 10 ? '0' + second.toString() : second.toString();

        return [year + "년 " + month +"월 " + day + "일 " , hour + "시 " + minute + "분 " + second + "초"];
    }
    return <div>
        {logs? <>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            날짜
                        </TableCell>
                        <TableCell>
                            시간
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                   {logs.map(element => (
                        <TableRow key={element.id}>
                                {makeDateArray(element.blinkAt).map((element)=>(
                                    <TableCell>
                                        {element}
                                    </TableCell>
                                ))}
                        </TableRow>
                    )    
                    )}
                </TableBody>
            </Table>
            <h4>{userObj.uid}</h4>
            <h4>Chart</h4>
        </>: "Loading..."}
        </div>
}



export default Chart;