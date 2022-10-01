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
import CommentIcon from '@mui/icons-material/Comment';
import moment from "moment";
import LaunchIcon from '@mui/icons-material/Launch';
import Link from '@mui/material/Link';
import { AuthContext } from '../context/auth';

import DislikeButton from './DislikeButton';
import LikeButton from "./LikeButton";

import DeleteButton from "./DeleteButton";




export default function PostCard(props) {

  const {user} = React.useContext(AuthContext);

  return (
    <Card align="left" sx={{ maxWidth: 345 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: "#F5F5F5", color:"black" }} aria-label="recipe">
            {props.userName.toUpperCase()[0]}
          </Avatar>
        }
        action={
          <Link href={`/posts/${props._id}` } target="_blank">
        <IconButton sx={{marginLeft:"20px"}} aria-label="comment">
        <LaunchIcon />
        </IconButton>
         </Link>
        }
        title={props.userName}
        subheader={moment(props.createdAt).fromNow()}
      />
      <CardMedia
        component="img"
        height="194"
        image={props.image}
        alt={props.title}
      />
      <CardContent>
        <Typography variant="h6" color="text.primary">
          {props.title}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {props.restaurant + ", "+ props.location}
        </Typography>
      
        <br></br>

        <Typography variant="body2" color="text.primary">
          {props.body}
        </Typography>

<br></br>
        <Typography variant="body2" color="text.secondary">

        {props.tags.map((tag)=>"#"+tag.trim()+" ")}

        </Typography>
        
      </CardContent>
      <CardActions disableSpacing>


       <LikeButton user={user} _id = {props._id} likes = {props.likes} likeCount = {props.likeCount}></LikeButton>


       <DislikeButton user={user} _id = {props._id} dislikes = {props.dislikes} dislikeCount = {props.dislikeCount}></DislikeButton>



        
        <Link href={`/posts/${props._id}`}>
        <IconButton sx={{marginLeft:"20px"}} aria-label="comment">
        <CommentIcon   />
        </IconButton>
         </Link>


        <Typography variant="body2">{props.commentCount}</Typography>


{user && user.userName == props.userName  && (

  <DeleteButton _id={props._id}></DeleteButton>

)}
      
        </CardActions>


      
     
    </Card>
  );
}
