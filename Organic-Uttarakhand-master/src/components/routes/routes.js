import React from 'react';
import Login from '../../components/Login/Login';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'  
import Dashboard from '../../Pages/Dashboard/Dashboard';
import Slot from '../../Pages/Slot/Slot';
import Seat from '../../Pages/Seat/Seat';
import Student from '../../Pages/Student/Student';
import StudentDetails from '../../Pages/Student/showDetails';

import { Redirect } from "react-router-dom"
import { useSelector } from 'react-redux'

const routerSwitch = (authStatus)=>
{
  return(
      <>
        <Route exact path="/" component={Login} /> 
        {/* <Route exact path="/Slot" authStatus={authStatus} component={Slot} />  */}
        <PrivateRoute exact path="/Slot" authStatus={authStatus} component={Slot} />  
        <PrivateRoute exact path="/dashboard" authStatus={authStatus} component={Dashboard} />  
        <PrivateRoute exact path="/seat" authStatus={authStatus} component={Seat} />  
        <PrivateRoute exact path="/student" authStatus={authStatus} component={Student} />  
        <PrivateRoute exact path="/studentDetails" authStatus={authStatus} component={StudentDetails} />  
        <PrivateRoute exact path="/student/:id" authStatus={authStatus} component={Student} />   
      </>
  )
}
 
const PrivateRoute = ({component: Component, authStatus,...rest}) => {
 
  return (
      // restricted = false meaning public route
      // restricted = true meaning restricted route
      <Route {...rest} render={props => (
        authStatus ?
            <Component {...props} />
        : <Redirect to="/" />
    )} />
  );
};
const Routes = props => {

  const authStatus = useSelector((state)=>state.ins.authStatus)
    return  (
        <div className="page-wrapper">
            <div className="page-content-wrapper">
                <div className="page-content">
                    {routerSwitch(authStatus)}
                </div>
            </div>
        </div> 
            
    );
};
 

export default  Routes ;