import React from "react";
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Auth from "../routes/Auth";
import Home from "../routes/Home";
import Navigation from "./navigation";
import Profile from "routes/Profile";
import WebcamCapture from "../routes/webcam";
import TabTutorial from "routes/taptutorials";
import Test from "routes/Test";

const AppRouter = ({isLoggedIn})=>{
    return (
        <Router>
            {isLoggedIn && <TabTutorial/>}
            <Switch>
                {isLoggedIn ? 
                <>
                <Route exact path = "/">
                    <Home/>
                </Route>
                <Route exact path = "/profile">
                    <Profile/>
                </Route>
                <Route exact path = "/webcam">
                    <WebcamCapture/>
                </Route>
                <Route exact path = "/log">
                    <Test/>
                </Route>
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
