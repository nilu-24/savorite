

const postsResolvers = require("./posts.js");
const usersResolvers = require("./users.js");
const commentsResolvers = require("./comments.js");

module.exports = {

    Post:{
        likeCount: (parent) => parent.likes.length,
        dislikeCount: (parent)=> parent.dislikes.length,
        commentCount: (parent) => parent.comments.length
    },

    Query: {
        ...postsResolvers.Query
    },

    Mutation: {

        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    }


}