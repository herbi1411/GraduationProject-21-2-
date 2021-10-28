import React, { useState, useEffect } from "react";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import { dbService } from "fbase";
import {makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { TableContainer } from "@material-ui/core";
import TablePagination from '@material-ui/core/TablePagination';
import HighChart from "./HighChart";
import HighChart_AlertLog from "./HighChart_AlertLog";



const columns = [
    {id: 'oid', label: '번호', minWidth: 100},
    {id: 'stime', label: '시작시간', minWidth: 170},
    {id: 'etime', label: '종료시간', minWidth: 170},
    {id: 'alertCount', label: '눈깜빡임 알림 횟수', minWidth: 100},
];
const useStyles = makeStyles({
    root:{
        width: '100%',

    },
    container:{
        maxHeight: 440,
    },
    thcell:{
        backgroundColor: "beige",
    },
    tcell:{
        "fontFamily" : "'카페24 당당해', '맑은 고딕', serif",
        backgroundColor: "lightgray",
    },
    tcell2:{
        "fontFamily" : "'카페24 당당해', '맑은 고딕', serif",
    },
    h5:{
        textAlign : "center",
        fontFamily :  "'맑은 고딕', serif",
        marginTop: "5%"
    },
});

const AlertHistory = ({userObj}) => {
    const classes = useStyles();
    const [page,setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [logs, setLogs] = useState(null);

    const handleChangePage = (event,newPage) => {setPage(newPage)};
    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    }
    const getLogs = async() =>{

        let logContainer = [];
        let idx = 0;
        dbService.collection("usageHistory").where("uid","==",userObj.uid).orderBy("startRecordAt","desc").get().then((querySnapshot)=>{
            querySnapshot.forEach((doc)=>{
                const stimeString = makeDateString(doc.data().startRecordAt);
                const etimeString = makeDateString(doc.data().endRecordAt);
                const alertCount = doc.data().alertCount;

                const docObject = {
                    oid: idx + 1,
                    id: doc.id,
                    stime: stimeString,
                    etime: etimeString,
                    alertCount: alertCount + "회",
                };
                if(alertCount){
                    idx+=1;
                    logContainer.push(docObject);
                }
            });
            setLogs(logContainer);
        });
    }
    useEffect(()=>{
        getLogs();
    },[]);
    

    const makeDateString = (dval) => {
        const date = new Date();
        date.setTime(dval);

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

        return month +"월 " + day + "일  " + hour + "시 " + minute + "분 " + second + "초";
    }

    return (
    <Paper className ={classes.root}>
        {logs? <>
            <TableContainer className = {classes.conatiner}>
                <h5 className = {classes.h5}> 알림 기록</h5>
                <Table stickyHeader aria-label="sticky table" className = {classes.table}>
                    <TableHead className = {classes.thead}>
                        <TableRow className = {classes.throw} >
                            {columns.map((column)=>(
                                <TableCell
                                    className={classes.thcell}
                                    key={column.id}
                                    align={column.align}
                                    style={{minWidth: column.minWidth}}
                                >
                                    {column.label}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log,index)=>(
                                <TableRow hover role="checkbox" tabIndex = {-1} key={log.id}>
                                    {
                                        columns.map((column)=>{
                                            const value = log[column.id];
                                            const swc = index % 2;
                                            return (
                                                <TableCell key = {column.id} align={column.align} className ={swc ? classes.tcell : classes.tcell2}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10,25,50, {value: -1, label: 'All'}]}
                component="div"
                count={logs.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange = {handleChangeRowsPerPage}
            />
        </>: "Loading..."}
        {logs &&  <HighChart_AlertLog datas={logs}/> }
    </Paper>
    );
}

export default AlertHistory;