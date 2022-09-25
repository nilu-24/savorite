import React from "react";
import { Router, Redirect, Route } from "react-router-dom";
import { AuthContext } from "./auth";

 function AuthHandle({component: Component, ...rest}){

    //getting a user from the context
const {user} = React.useContext(AuthContext);

return (
    <Route {...rest} render={props=>user? <Redirect to="/"/> : <Component {...props}/>}>
    </Route>
);

}

export default AuthHandle;


