module.exports.validateRegisterInput = (

    userName,email,password,confirmPassword

)=>{
    //for the error message
    const err  ={};

    //trim to remove empty spaces
    trimUserName = userName.trim();
    trimEmail = email.trim();


    if(trimUserName===""){
        err.userName = "Username Cannot Be Empty."
    }

    if(trimEmail===""){
        err.email = "Email Cannot Be Empty."
    }

    else{
        //regex to check a string is an email
        const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;

        if(!email.match(regEx)){
            err.email = "Please Enter Valid Email Address."
        }
    }

    if(password === ""){
        err.password = "Password Cannot Be Empty."
    }

    else if(password!==confirmPassword){
        err.password = "Passwords Don't Match."
    }


    return {
        err,
        valid: Object.keys(err).length <1
    }
}


module.exports.validateLoginInput = (userName,password)=>{

    const err = {};

    //trim to remove empty spaces
    trimUserName = userName.trim();


    if(trimUserName===""){
        err.userName = "Username Cannot Be Empty."
    }

    if(password===""){
        err.password = "Password Cannot Be Empty."
    }

    return {
        err,
        valid: Object.keys(err).length < 1
      };


}