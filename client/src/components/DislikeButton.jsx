import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';

import React from "react";
import Link from '@mui/material/Link';

import { useMutation } from "@apollo/client";
import gql from "graphql-tag";


export default function DislikeButton(props){


    const[disliked, setDisliked] = React.useState(false);
    React.useEffect(
        ()=>{
            if(props.user && props.dislikes.find(dislike => dislike.userName == props.user.userName)){
                setDisliked(true);
            }
            else{
                setDisliked(false);
            }
        }, [props.user,props.dislikes]
    )

    
    const [dislikePost] = useMutation(DISLIKE_POST_MUTATION,{
        
        variables: {postId: props._id}
    });

    const dislikeButton = props.user? (
        disliked? (<> <IconButton onClick={dislikePost} sx={{color:"red"}}  aria-label="dislike">
        <ThumbDownIcon />
      </IconButton>
  <Typography variant="body2">{props.dislikeCount}</Typography>
  </>):
  (<> <IconButton onClick={dislikePost}  aria-label="dislike">
        <ThumbDownIcon />
      </IconButton>

      
  <Typography variant="body2">{props.dislikeCount}</Typography>
  </>)

    ): 
    
    (
    
    <> 
    <Link href="/login">
    <IconButton  aria-label="like">
    <ThumbDownIcon />
  </IconButton>
  </Link>
<Typography variant="body2">{props.dislikeCount}</Typography>

</>

)


return dislikeButton;
    

}


 const DISLIKE_POST_MUTATION = gql`
 
 mutation dislikePost($postId: ID!){
    dislikePost(postId: $postId){
        _id
        dislikes{
            _id
            userName
        }
        dislikeCount
    }
 }
 
 
 `