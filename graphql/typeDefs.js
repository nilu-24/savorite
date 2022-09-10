

const { gql } = require('apollo-server');


const typeDefs = gql `

type Post{

    _id: ID!
    title: String!
    restaurant: String!
    location: String!
    tags: [String]
    image: String
    body: String!
    createdAt: String!
    userName: String!
}

type Query{
    getPosts: [Post]
    getPost(postId: ID!): Post
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
    login(userName:String!, password:String!):User!
    createPost(title: String!, body:String!, image:String, tags:[String], restaurant:String!, location:String ): Post!
    deletePost(postId: ID!): String!
}

`;


module.exports = typeDefs;