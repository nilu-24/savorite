import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';

import React from "react";
import Link from '@mui/material/Link';

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";


export default function LikeButton(props){

    const[liked, setliked] = React.useState(false);
    React.useEffect(
        ()=>{
            if(props.user && props.likes.find(like => like.userName == props.user.userName)){
                setliked(true);
            }
            else{
                setliked(false);
            }
        }, [props.user,props.likes]
    )

    
    const [likePost] = useMutation(LIKE_POST_MUTATION,{
        
        variables: {postId: props._id}
    });

    const likeButton = props.user? (
        liked? (<> <IconButton onClick={likePost} sx={{color:"#ff003b"}}  aria-label="like">
        <ThumbUpIcon />
      </IconButton>
  <Typography variant="body2">{props.likeCount}</Typography>
  </>):
  (<> <IconButton onClick={likePost}  aria-label="like">
        <ThumbUpIcon />
      </IconButton>

      
  <Typography variant="body2">{props.likeCount}</Typography>
  </>)

    ): 
    
    (
    
    <> 
    <Link href="/login">
    <IconButton  aria-label="like">
    <ThumbUpIcon />
  </IconButton>
  </Link>
<Typography variant="body2">{props.likeCount}</Typography>

</>

)


return likeButton;
    

}


 const LIKE_POST_MUTATION = gql`
 
 mutation likePost($postId: ID!){
    likePost(postId: $postId){
        _id
        likes{
            _id
            userName
        }
        likeCount
    }
 }
 
 
 `