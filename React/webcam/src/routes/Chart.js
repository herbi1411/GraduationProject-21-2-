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

const columns = [
    {id: 'oid', label: '번호', minWidth: 100},
    {id: 'date', label: '날짜', minWidth: 170},
    {id: 'time', label: '시간', minWidth: 170}
];
const useStyles = makeStyles({
    root:{
        width: '100%',
    },
    container:{
        maxHeight: 440,
    }
});

const Chart = ({userObj}) => {
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
        dbService.collection("log").where("uid","==",userObj.uid).orderBy("blinkAt","desc").get().then((querySnapshot)=>{

            querySnapshot.forEach((doc)=>{
                const dateArray = makeDateArray(doc.data().blinkAt);
                const docObject = {
                    oid: idx + 1,
                    id: doc.id,
                    date: dateArray[0],
                    time: dateArray[1],
                    // ...doc.data(),
                };
                idx+=1;
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
    return (
    <Paper className ={classes.root}>
        {logs? <>
            <TableContainer className = {classes.conatiner}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column)=>(
                                <TableCell
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
                            logs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((log)=>(
                                <TableRow hover role="checkbox" tabIndex = {-1} key={log.id}>
                                    {
                                        columns.map((column)=>{
                                            const value = log[column.id];
                                            return (
                                                <TableCell key = {column.id} align={column.align}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })
                                    }
                                </TableRow>
                            ))
                        }
                    
                    {/* {logs.map(element => (
                            <TableRow key={element.id}>
                                    <TableCell>
                                        {element.oid}
                                    </TableCell>
                                    {makeDateArray(element.blinkAt).map((element)=>(
                                        <TableCell key={element}>
                                            {element}
                                        </TableCell>
                                    ))}
                            </TableRow>
                        )    
                        )} */}
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
    </Paper>);
}



export default Chart;