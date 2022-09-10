
//Users Resolvers

const User = require("../../models/User.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");
const {SECRET} = require("../../keys.js");

const { validateRegisterInput, validateLoginInput } = require("../../utils/validation.js");


module.exports = {

    Mutation: {

        //login functionality
        async login(parent, {userName, password}){

            const {err, valid} = validateLoginInput(userName,password);
            const user = await User.findOne({userName});

            if (!user){
                err.standard = "User Doesn't Exist.";
                throw new UserInputError("User Doesn't Exist.",{err});
            }

            const match = await bcrypt.compare(password,user.password);

            if(!match){
                err.standard = "Login Failed. Enter Correct Credentials."
                throw new UserInputError("Login Failed. Enter Correct Credentials.",{err});
            }

            const token = jwt.sign({
                _id: user._id,
                email: user.email,
                userName: user.userName,

            },SECRET, {expiresIn: '1h'});

            return {
                ...user._doc,
                _id: user._id,
                token
            }
        },

       async register(parent, {registerInput:
            { email, userName, password, confirmPassword } 
        }, context, info){


            //  Validate the data

            const {valid, err} = validateRegisterInput(userName,email,password,confirmPassword);
             if(!valid){
                throw new UserInputError('Errors',{err})
                }
            //fetching the user
            const user = await User.findOne({userName});

            if(user){
                //check if the user already exists
                throw new UserInputError("Username Already Exists!", {
                    errors:{
                        userName: "Username Already Exists."
                    }
                });
            }


            // Hash Passwords, create JWT Token
            //using bcrypt and adding 11 rounds of salting
            password = await bcrypt.hash(password,11);


            //creating our new user
            const newUser = new User({
                email: email,
                userName: userName,
                password: password,
                createdAt: new Date().toISOString()
            });

            const result = await newUser.save();
            const token = jwt.sign({
                _id: result._id,
                email: result.email,
                userName: result.userName,

            },SECRET, {expiresIn: '1h'});

            return {
                ...result._doc,
                _id: result._id,
                token
            }

        }
    }
}