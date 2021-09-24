import React, { Component } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Link, withRouter } from 'react-router-dom';
import { Button, Toolbar, Grid } from '@material-ui/core';
import authService from "fbase";

class TabTutorial extends Component {
  constructor(props) {
    super(props);
    const currentPath = this.props.location.pathname;
    let value = 0;
    if (currentPath === '/log') value = 1;
    else if (currentPath === '/chart') value = 2;
    else if (currentPath === '/usage-history') value = 3;
    this.state = {
      value
    }
  }
  a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
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
  render() {
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <Grid item xs>
              <Tabs value={this.state.value} onChange={this.handleChange} aria-label="simple tabs example">
                <Tab label="Item One" component = {Link} to="/webcam" {...this.a11yProps(0)} />
                <Tab label="Item Two" component = {Link} to="/log" {...this.a11yProps(1)} />
                <Tab label="Item Three" component = {Link} to="/chart" {...this.a11yProps(2)} />
                <Tab label="usage-history" component = {Link} to="/usage-history" {...this.a11yProps(3)} />
              </Tabs>
            </Grid>
            <Grid>
              <Button color="inherit" size="small" onClick={this.onLogOutClick}>Log out</Button>
            </Grid>
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
      </div>
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