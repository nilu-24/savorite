
//initialising graphQL and mongoose
const {ApolloServer} = require("apollo-server");
const mongoose = require("mongoose");

//importing the mongoDB url
const { MONGO_URL } = require("./keys.js");
const resolvers = require("./graphql/resolvers");
const typeDefs = require("./graphql/typeDefs.js");



const server = new ApolloServer({
typeDefs,
resolvers
});


//connect to mongoDB
mongoose.connect(MONGO_URL, { useNewUrlParser:true})
.then(()=>{
    console.log("MongoDB successfully connected.")
   return server.listen({port:4000})
}).then(res=>{
    console.log("Server running at:" + res.url);
});


