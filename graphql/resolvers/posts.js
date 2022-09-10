
const Post = require("../../models/Post.js");
const { Mutation } = require("./users.js");

const auth = require("../../utils/auth.js");
const { AuthenticationError } = require("apollo-server");


module.exports = {
    Query:{
        async getPosts(){
            try{
                //returns all the posts
                const posts  = await Post.find().sort({createdAt:-1});
                return posts;
            }
            catch(err){
             throw new Error(err);
            }
        }
,
        async getPost(_,{ postId }){

            try{
                const post = await Post.findById(postId);

                if(post){
                    return post;
                }
                else{
                    throw new Error("Post Not Found.");
                }
            }
catch(err){
    throw new Error("Post Not Found.");
}
        }
     },

     Mutation:{


        async createPost(_,{ title, body, image, tags, restaurant, location },context){

            //making sure the user is authenticated to make a post
            const user = auth(context);

           // console.log(user);

            const newPost = new Post({
                title,
                image,
                tags,
                restaurant,
                location,
                body, 
                user: user.id,
                userName: user.userName,
                createdAt: new Date().toISOString()
            });

            const post = await newPost.save();
            return post;
        },

        async deletePost(_, {postId}, context){
            //checking if the user is authenticated
            const user = auth(context);

            try{

                const post = await Post.findById(postId);
                if (user.userName === post.userName){
                    await post.delete();
                    return "Deleted Post Successfully."
                }

                else{
                    throw new AuthenticationError("Not Allowed.");
                }
            }
            catch(err){

                throw new Error("Action Not Allowed.");

            }
        }


     }
}