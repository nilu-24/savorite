//creating the post model

const { model, Schema } = require("mongoose");

const postSchema = new Schema({
    image: String,
    title:String,
    body: String,
    userName: String,
    createdAt: String,
    tags: [ String ],
    restaurant: String, 
    location: String, 
    comments: [
        {
            body: String,
            userName: String,
            createdAt: String
        }
    ],
    likes: [
        {
            userName:String, 
            createdAt: String
        }
    ],
    dislikes: [
        {
            userName:String, 
            createdAt: String
        }
    ],

user:{
    type: Schema.Types.ObjectId,
    ref: 'users'
}

});
module.exports = model('Post', postSchema);