
const User = require("../../models/User.js");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const { UserInputError } = require("apollo-server");

const {SECRET} = require("../../keys.js");


module.exports = {

    Mutation: {
       async register(parent, {registerInput:
            { email, userName, password, confirmPassword } 
        }, context, info){


            //  Validate the data
            //check if the user already exists

            //fetching the user
            const user = await User.findOne({userName});

            if(user){
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