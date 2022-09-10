

const { gql } = require('apollo-server');


const typeDefs = gql `

type Post{

    _id: ID!
    body: String!
    createdAt: String!
    userName: String!
}

type Query{
    getPosts: [Post]
}

type User{
    _id: ID!
    email: String!
    token: String!
    userName: String!
    createdAt:String!
}

input RegisterInput {
    email: String!
    userName: String!
    password: String!
    confirmPassword:String!
}

type Mutation{
    register(registerInput: RegisterInput): User!
}

`;


module.exports = typeDefs;