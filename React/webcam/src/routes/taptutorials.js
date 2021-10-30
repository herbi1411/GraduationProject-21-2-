import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, withRouter } from 'react-router-dom';
import { Button, Toolbar, Grid } from '@material-ui/core';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import IconButton from '@mui/material/IconButton';
import authService from "fbase";

class TabTutorial extends Component {
  constructor(props) {
    super(props);
    const value = this.getValue();
    this.state = {
      value
    }
  }
  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
      style: {
        "fontFamily": "'카페24 당당해', '맑은 고딕', serif",
      },
    };
  }
  handleChange = (event, newValue) => {
    this.setState({ value: newValue });
    //  console.log(newValue);
    // if(newValue === 0){
    //     this.props.history.push('/webcam');
    //     return <Redirect to="/push"/>
    // }
    // else if(newValue === 1){
    //     this.props.history.push('/log');
    // }
    // else if(newValue === 2){
    //     this.props.history.push('/chart');
    // }
  }
  onLogOutClick = (event) =>{
    authService.signOut();
    this.props.history.push('/');
  }
  onProfileClick = (event) => {
    this.props.history.push('/profile');
  }
  getValue = () => {
    const currentPath = this.props.location.pathname;
    let value = 0;
    // if (currentPath === '/log') value = 1;
    if (currentPath === '/alertHistory') value = 1;
    else if (currentPath === '/usage-history') value = 2;
    else if (currentPath === '/tips') value = 3;
    // else if (currentPath === '/highchart') value = 4;
    return value;
  }
  render() {
    return (
      <Box>
        <AppBar position="static" style={{ backgroundColor:"#f2bdf2", color:"black"}} /*color="secondary"*/>
          <Toolbar>
            <Grid item xs>
              <Tabs value={this.getValue()} onChange={this.handleChange} aria-label="simple tabs example" variant="fullWidth"> 
                <Tab label="눈 깜빡임 탐지" component = {Link} to="/webcam" {...this.a11yProps(0)} />
                {/* <Tab label="테스트" component = {Link} to="/log" {...this.a11yProps(1)} /> */}
                <Tab label="알림 기록" component = {Link} to="/alertHistory" {...this.a11yProps(1)} />
                <Tab label="사용 기록" component = {Link} to="/usage-history" {...this.a11yProps(2)} />
                <Tab label="눈건강 팁" component = {Link} to="/tips" {...this.a11yProps(3)} />
                {/* <Tab label="하이 차트" component = {Link} to="/highchart" {...this.a11yProps(4)}/> */}
              </Tabs>
            </Grid>
            {/* <div style = {{"padding-right": "50px"}}> */}
              <Grid item>
                <IconButton aria-label="profile" onClick = {this.onProfileClick}>
                    <AccountCircleIcon fontSize = "large"/>
                </IconButton>
              </Grid>
              <Grid item>
                <Button color="inherit" size="small" onClick={this.onLogOutClick} variant="outlined">Log out</Button>
              </Grid>
            {/* </div> */}
          </Toolbar>
        </AppBar>


        {/* <TabPanel value={this.state.value} index={0}>
          Item One
      </TabPanel>
        <TabPanel value={this.state.value} index={1}>
          Item Two
      </TabPanel>
        <TabPanel value={this.state.value} index={2}>
          Item Three
      </TabPanel> */}
      </Box>
    );
  }
}
class TabPanel extends Component {
  render() {
    return (
      <Typography component="div" hidden={this.props.value !== this.props.index}>
        <Box p={3}>{this.props.children}</Box>
      </Typography>
    );
  }
}
export default withRouter(TabTutorial);