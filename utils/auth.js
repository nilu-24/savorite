
const { AuthenticationError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const {SECRET} = require("../keys.js");


module.exports = (context) =>{
    const authHeader = context.req.headers.authorization;
    if (authHeader){
        const token = authHeader.split('Bearer ')[1];
        //verify the token
        if(token){
            try{
                const user = jwt.verify(token, SECRET);
                return user;
            }
            catch(err){ 
                throw new AuthenticationError("Token Expired/Invalid.");
            }
        }
        else{
            throw new Error("Authentication Token Must Be Bearer [token].");
        }
    }
    else{
        throw new Error("Authentication Header Must Be Provided.");
    }

}