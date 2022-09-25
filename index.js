
//initialising graphQL and mongoose
const {ApolloServer} = require("apollo-server");
const mongoose = require("mongoose");

//importing the mongoDB url
const { MONGO_URL } = require("./keys.js");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs.js");


const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
typeDefs,
resolvers,
context: ({req})=>{
    return ({req});
}
});


//connect to mongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser:true})
.then(()=>{
    console.log("MongoDB successfully connected.")
   return server.listen({port:PORT})
}).then(res=>{
    console.log("Server running at:" + res.url);
}).catch(err=>console.log(err));


