
const { gql } = require('apollo-server');


const typeDefs = gql `

type Comment{
    _id: ID!
    body: String!
    userName: String!
    createdAt: String!
}

type Like{
    _id: ID!
    userName: String!
    createdAt: String!
}

type Dislike{
    _id: ID!
    userName: String!
    createdAt: String!
}


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
    comments: [Comment]!
    likes: [Like]!
    dislikes: [Dislike]!    
    likeCount: Int!
    dislikeCount: Int!
    commentCount: Int!
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
    createComment( postId: String!, body: String! ): Post!
    deleteComment( postId: ID!, commentId: ID! ): Post!
    likePost( postId:ID! ): Post!
    dislikePost( postId:ID! ): Post!
}

`;


module.exports = typeDefs;