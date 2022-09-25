import React, {createContext, useReducer} from "react";
import jwtDecode from "jwt-decode";

const initialState = {
    user: null
}

//if token is there
if (localStorage.getItem("jwtToken")){
    //decode the jwt token
    const decoded = jwtDecode(localStorage.getItem("jwtToken"));

    //checking if our token has expired or not
    if(decoded.exp*1000 < Date.now()){
        localStorage.removeItem('jwtToken');
    }
    else{
        initialState.user = decoded;
    }
}

const AuthContext = createContext({
    user: null,
    login: (data)=>{},
    logout: (data)=>{}
})

//reducer

function authReducer(state, action){

    switch(action.type){
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }

            case 'LOGOUT':
                return {
                    ...state,
                    user: null
                }

                default:
                    return state;
    }
}


function AuthProvier(props){

    //provide reducer and initial state
    const [state, dispatch] = useReducer(authReducer, initialState);

    function login(data){

        localStorage.setItem("jwtToken", data.token);

dispatch({
    type: 'LOGIN',
    payload: data
})
    }

    function logout(){

        localStorage.removeItem("jwtToken");

        dispatch({type:'LOGOUT'})
    }

    return (
        <AuthContext.Provider value={{user: state.user,login,logout}}
        {...props}></AuthContext.Provider>
    )
    
}



export {AuthContext, AuthProvier}