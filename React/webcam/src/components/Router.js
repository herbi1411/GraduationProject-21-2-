import React from "react";
import {HashRouter as Router, Route, Switch, Redirect} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./navigation";
import Profile from "routes/Profile";
import WebcamCapture from "../routes/webcam";
import TabTutorial from "routes/taptutorials";
import Test from "routes/Test";
import Chart from "routes/Chart";
import UseageHistory from "routes/UseageHistory";
import HighChart from "routes/HighChart";
import AlertHistory from "routes/AlertHistory";
import Tips from "routes/Tips";

const AppRouter = ({isLoggedIn, userObj})=>{
    return (
        <Router>
            {isLoggedIn && <TabTutorial/>}
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path = "/">
                    <Redirect to = "/tips"/>
                    {/* <Home/> */}
                </Route>
                <Route exact path = "/profile">
                    <Profile/>
                </Route>
                <Route exact path = "/webcam">
                    <WebcamCapture userObj = {userObj}/>
                </Route>
                <Route exact path = "/log">
                    <Test/>
                </Route>
                {/* <Route exact path = "/chart">
                    <Chart userObj = {userObj}/>
                </Route> */}
                <Route exact path = "/alertHistory">
                    <AlertHistory  userObj = {userObj}/>
                </Route>
                <Route exact path = "/usage-history">
                    <UseageHistory userObj = {userObj}/>
                </Route>
                <Route exact path = "/tips">
                    <Tips/>
                </Route>
                {/* <Route exact path = "/highchart">
                    <HighChart/>
                </Route> */}
                </>
                :
                <Route exact path = "/">
                    <Auth/>
                </Route>}
            </Switch>
        </Router>
    ) 

}
export default AppRouter; 
