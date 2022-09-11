
const Post = require("../../models/Post.js");
const auth = require("../../utils/auth.js");

const {UserInputError, AuthenticationError} = require("apollo-server");

module.exports = {


    Mutation: {

        createComment: async (_, {postId, body},context) =>{
            const user = auth(context);

            if(body.trim()===""){
                throw new UserInputError("Empty Comment.",{
                    errors:{
                        body: 'Comment Cannot Be Empty.'
                    }
                });
            }


            const post = await Post.findById(postId);

            if (post){
                post.comments.unshift({
                    body: body,
                    userName: user.userName,
                    createdAt: new Date().toISOString()
                })
                await post.save();
                return post;
            }

            else{
                throw UserInputError("Post Not Found.");
            }

            
        },

       async deleteComment(_, {postId, commentId}, context ){
           const {userName} = auth(context);
           const post = await Post.findById(postId);

           console.log(post);

           if(post){
               
               const commentIndex = post.comments.findIndex(c => c._id == commentId);
               if (post.comments[commentIndex].userName === userName){
                   post.comments.splice(commentIndex,1);
                   await post.save();
                   return post;
               }
               else{
                   throw new AuthenticationError('Action Not Allowed.');
               }
           }

           else{
               throw new UserInputError("Post Doesn't Exist.");
           }
       },

       async likePost(parent, {postId}, context){
           const user = auth(context);
           const post = await Post.findById(postId);

           if (post){
               if(post.likes.find(like=>like.userName==user.userName)){
                   //post was already liked
                //so we need to unlike it
                post.likes = post.likes.filter(like => like.userName != user.userName);
               }
               else{
                //post was not liked so now we can like it
                post.likes.push({
                    userName: user.userName,
                    createdAt: new Date().toISOString()
                })
               }
               await post.save();
               return post;
           }
           else{
               throw new UserInputError("Post Doesn't Exist.");
           }
       },
       async dislikePost(parent, {postId}, context){
        const user = auth(context);
        const post = await Post.findById(postId);

        if (post){
            if(post.dislikes.find(dislike=>dislike.userName==user.userName)){
                //post was already liked
             //so we need to unlike it
             post.dislikes= post.dislikes.filter(dislike => dislike.userName != user.userName);
            }
            else{
             //post was not liked so now we can like it
             post.dislikes.push({
                 userName: user.userName,
                 createdAt: new Date().toISOString()
             })
            }
            await post.save();
            return post;
        }
        else{
            throw new UserInputError("Post Doesn't Exist.");
        }
    }  
    }


}
