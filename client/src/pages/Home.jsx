
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import PostCard from "../components/PostCard";
import Grid from '@mui/material/Grid';
import { Typography } from "@mui/material";
import React from "react";
import { AuthContext } from '../context/auth';
import CircularProgress from '@mui/material/CircularProgress';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import plate from "../components/plate.png";

import Form from "../components/Form";
import hi from "../components/hi.gif";

export default function Home(){
  document.body.style.backgroundImage = "";
  document.body.style.backgroundColor = "";


  const {user, logout} = React.useContext(AuthContext);

    const {loading, data} = useQuery(FETCH_POSTS_QUERY);

    if(data){
     var posts = data.getPosts;
     
    }

    const [query, setQuery] = React.useState("");

    //in the following span component make some landing page stuff
    //nothing too much, just a small intro

return (
  <>
<div className="width">


{!user?<div>
  <img height="100px" src={plate}></img>
  <Typography sx={{fontSize:"50px"}}> <b>Discover <span style={{color:"#ff003b"}}>food</span></b> that always fits your <b>mood</b>!
  
  </Typography>

<Typography
color="text.secondary"
 sx={{fontSize:"20px"}}>
Confused what to order? Not anymore!
</Typography>
<Typography
color="text.secondary"
 sx={{fontSize:"20px"}}>
Find out the most popular food suggestions, recommend your favorite dishes and explore cuisine from all across the world. 🌎
</Typography>



</div>:<></>}



{user?  <> 
<center><img height="100"  src={hi}></img></center>

<Typography align="center" style={{fontSize:"35px"}}>{"Welcome, "} <span style={{color:"#ff003b"}}>{user.userName}!</span>
<Typography color="text.secondary"  >Discover and share all your favorite meals with savorite 😋</Typography>
</Typography>
</>
:<span></span>}

<br></br>
<br></br>
<center>
{user?
<Typography sx={{fontSize:"40px"}} variant="h2" align="left"> <span style={{color:"#ff003b"}}>Share</span> & Explore </Typography>:
<Typography sx={{fontSize:"40px"}} variant="h2" align="left">Explore </Typography>
}
<hr></hr>

</center>

<br></br>
<center>

    <Paper 
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' , maxWidth: 700 }}
    >
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder=" Search by user, location, restaurants, tags..."
        onChange={(e)=>{
          setQuery(e.target.value.toLowerCase());
        }}
      />
      <IconButton sx={{ p: '10px' }} aria-label="search">
        <SearchIcon />
      </IconButton>
    </Paper>
    </center>

<br></br>




<br></br>
{loading ? <>
<center >
      <CircularProgress sx={{color:"#ff003b"}} />
</center>

</>:<Grid container spacing={2} align="center">


{user? <Grid item xs={12} sm={6} md={4} lg={3} >
           <Form></Form>
              </Grid>:<div></div>}


{posts.filter(post=>post.restaurant.toLowerCase().includes(query)
|| post.location.toLowerCase().includes(query)
|| post.userName.toLowerCase().includes(query)
||post.title.toLowerCase().includes(query)
|| post.tags.filter(tag=>tag.toLowerCase().includes(query)).length>0

).map((post)=>{

  return(
    
        <Grid item xs={12} sm={6} md={4} lg={3} >
           
     <PostCard _id = {post._id} body = {post.body} title = {post.title} userName={post.userName}
    restaurant = {post.restaurant} location = {post.location} likeCount={post.likeCount} dislikeCount={post.dislikeCount}
    commentCount = {post.commentCount} tags = {post.tags} createdAt={post.createdAt} image = {post.image}
    likes = {post.likes} dislikes = {post.dislikes} comments = {post.comments}
  />       
  <br></br>
        </Grid>
  
  );
  
})}</Grid>}

</div>

 </>
);
}

const FETCH_POSTS_QUERY = gql`
query{
    getPosts {
      _id
      likeCount
      dislikeCount
      commentCount
      userName
      body
      createdAt
      title
      tags
      location
      restaurant
      image
      comments{
        _id
        createdAt
        userName
        body
      }
      
      likes{
        _id
        userName
        createdAt
      }
      dislikes{
        _id
        userName
        createdAt
      }
    }
    }


`

