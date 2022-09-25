import gql from 'graphql-tag';
import Grid from '@mui/material/Grid';
import { useMutation, useQuery } from "@apollo/client";
import CircularProgress from '@mui/material/CircularProgress';
import DeleteButton from '../components/DeleteButton';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import CommentIcon from '@mui/icons-material/Comment';
import moment from "moment";
import { AuthContext } from '../context/auth';
import { TextField } from '@mui/material';
import { Button } from '@mui/material';


import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import { Paper } from '@mui/material';


function SinglePost(props){


  document.body.style.backgroundColor="#ebebeb";


function deletePostCallback(){
  props.history.push('/');
}

    const postId = props.match.params.postId;
    console.log(postId)


    const { user } = React.useContext(AuthContext);

const [comment, setComment] = React.useState('');





    const {loading ,data , error} = useQuery(FETCH_POST_QUERY, {
      variables: {
        postId
      }
    });


const [submitComment] = useMutation(CREATE_COMMENT_MUTATION, {
  update(){
    setComment('');

  } ,
  variables:{
    postId: postId, 
    body:comment
  }
})



    let postM;

    if(!loading){
      var getPost = data.getPost;
    }


    if (!getPost){
        postM =  <>
        <center >
              <CircularProgress />
        </center>
        
        </>
    }

    else{

        //time to destructure

        const {_id, body, createdAt, userName, location, restaurant, tags, image, title, likes, dislikes,
        comments, likeCount, dislikeCount, commentCount} = getPost;


        postM = (
<div style={{margin:"5%"}}>
          <Grid container spacing={2} align="center">


<Grid item xs={12} sm={12} md={6} lg={6} >

            <Card align="left" sx={{ maxWidth: 700 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: "#F5F5F5", color:"black"}} aria-label="recipe">
                  {userName.toUpperCase()[0]}
                </Avatar>
              }
              title={userName}
              subheader={moment(createdAt).fromNow()}
            />
            <CardMedia
              component="img"
              height="400"
              image={image}
              alt={title}
            />
            <CardContent>
              <Typography variant="h4" color="text.primary">
                {title}
              </Typography>
              <Typography variant="h6" color="text.secondary">
                {restaurant + ", "+ location}
              </Typography>
            
              <br></br>
      
              <Typography variant="body1" color="text.primary">
                {body}
              </Typography>
      
      <br></br>
              <Typography variant="body1" color="text.secondary">
      
              {tags.map((tag)=>"#"+tag.trim()+" ")}
      
              </Typography>
              
            </CardContent>
            <CardActions disableSpacing>
      
  

{user && user.userName == userName  && (

<DeleteButton _id={_id} callback={deletePostCallback}></DeleteButton>

)}
            
              </CardActions>
      
      
       
          </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} >

          <Card align="left" sx={{ maxWidth: 700}} >

<Typography sx={{marginTop:"20px"}} align="center" variant="h6">
<IconButton sx={{marginLeft:"20px"}} aria-label="comment">
        <CommentIcon   />
        </IconButton>Comments ({commentCount})</Typography>
<br></br>
          <Paper style={{maxHeight: 600, overflow: 'auto', margin:"20px", border:"1px solid #ff003b", boxShadow:"none"}}>
      <CssBaseline />
      <List style={{maxHeight: '100%', overflow: 'auto'}}>

      {comments.length==0?<Typography variant="body2" align="center">No comments</Typography>:<></>}

        {comments.map((comment) => (

          <ListItem >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "#F5F5F5", color:"black"}} aria-label="recipe">
            {comment.userName.toUpperCase()[0]}
          </Avatar>
            </ListItemAvatar>
            <ListItemText primary={comment.userName +" "+"(" +moment(comment.createdAt).fromNow()+")" } secondary={comment.body} />


{(user && user.userName==comment.userName)?<DeleteButton _id={_id} commentId = {comment._id}></DeleteButton>:<></>}

          </ListItem>

        ))}

      </List>

    </Paper>

  
{user?
<>
<Typography variant="h6" align="center" sx={{margin:"20px"}}>
<IconButton sx={{marginLeft:"20px"}} aria-label="comment">
        <AddCommentIcon   />
        </IconButton>
Write a comment</Typography>
<form onSubmit={(e)=>{
e.preventDefault();
submitComment();
}} style={{margin:"20px"}}>

<TextField multiline required minRows={2} name="comment" 
value={comment} onChange={(e)=>{
setComment(e.target.value)

console.log(comment)
}}
 label = "Comment" placeholder="Share your thoughts..." fullWidth>
</TextField>

<Button sx={{marginTop:"20px"}} type = "submit" variant="contained" fullWidth>Create Comment</Button>
</form>
</>
:<></>
}


    </Card>

          </Grid>
          <Grid item xs={12} sm={12} md={6} lg={6} >

          <Card align="left" sx={{ maxWidth: 700}} >

<Typography sx={{marginTop:"20px"}} align="center" variant="h6">
<IconButton sx={{marginLeft:"20px"}} aria-label="comment">
        <ThumbUpIcon   />
        </IconButton>
Likes ({likeCount})</Typography>
<br></br>
          <Paper style={{maxHeight: 600, overflow: 'auto'}}>
      <CssBaseline />
      <List style={{maxHeight: '100%', overflow: 'auto'}}>

        {likes.map(({ userName }, index) => (
          <ListItem >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "#F5F5F5", color:"black"}} aria-label="recipe">
            {userName.toUpperCase()[0]}
          </Avatar>
            </ListItemAvatar>
            <ListItemText primary={userName} />
          </ListItem>
  
        ))}
      </List>
    </Paper>
    </Card>

          </Grid>

          <Grid item xs={12} sm={12} md={6} lg={6} >


          <Card align="left" sx={{ maxWidth: 700}} >

<Typography sx={{marginTop:"20px"}} align="center" variant="h6">
<IconButton sx={{marginLeft:"20px"}} aria-label="comment">
        <ThumbDownIcon   />
        </IconButton>
Dislikes ({dislikeCount})</Typography>
<br></br>
          <Paper style={{maxHeight: 600, overflow: 'auto'}}>
      <CssBaseline />
      <List style={{maxHeight: '100%', overflow: 'auto'}}>

        {dislikes.map(({ userName }, index) => (
          <ListItem >
          <ListItemAvatar>
            <Avatar sx={{ bgcolor: "#F5F5F5", color:"black"}} aria-label="recipe">
            {userName.toUpperCase()[0]}
          </Avatar>
            </ListItemAvatar>
            <ListItemText primary={userName} />
          </ListItem>
  
        ))}
      </List>
    </Paper>
    </Card>

          </Grid>



          </Grid>
          </div>
        )


    }


    return postM;
}


//create comment

const CREATE_COMMENT_MUTATION = gql`
mutation($postId:String!, $body:String!){
  createComment(postId: $postId, body:$body){
    _id
    comments{
      _id
      body 
      createdAt
      userName
    }
    commentCount
  }
}



`


const FETCH_POST_QUERY = gql`

query($postId: ID!){

    getPost(postId: $postId){


        _id
         body
        createdAt
        userName 
        location
        restaurant
        tags
        image
        title
        likes {
            userName
        }

        dislikes {
            userName
        }

        likeCount
        dislikeCount
        commentCount

        comments{
            _id
            userName
            createdAt
            body
        }

    }
}



`

export default SinglePost;