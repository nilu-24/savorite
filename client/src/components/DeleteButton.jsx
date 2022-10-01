import React from "react";
import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import WarningIcon from '@mui/icons-material/Warning';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });


export default function DeleteButton(props){

    const [open, setOpen] = React.useState(false);

    const mutation = props.commentId? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };


    const [deletePost] = useMutation(mutation,{

        update(proxy){
            handleClose();


            if (props.callback){
                props.callback();
            }
            //remove from cache

            if(!props.commentId){
              const data = proxy.readQuery({
                query: FETCH_POSTS_QUERY
            });

            let newData = [...data.getPosts];


            newData = newData.filter(p=>p._id!=props._id)
            proxy.writeQuery({
                query: FETCH_POSTS_QUERY,
                data: {
                  ...data,
                  getPosts: {
                    newData,
                  },
                },
              });
            }

        },

            variables: {postId: props._id
            , commentId: props.commentId}
    })

    return (<>
        <IconButton onClick={handleClickOpen} sx={{marginLeft:"auto", color:"#ff003b"}} aria-label="delete">
          <DeleteIcon />
        </IconButton>
        <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
      {props.commentId? <DialogTitle> 
        {"Are you sure you want to delete this comment?"}
      
        </DialogTitle>:  <DialogTitle> 
        {"Are you sure you want to delete this post?"}
      
        </DialogTitle>}
       
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
          This process cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button sx={{ color:"red"}} onClick={deletePost}>Delete</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </DialogActions>
      </Dialog>
        </>
    );
}

const DELETE_POST_MUTATION = gql`

mutation deletePost($postId: ID!){

    deletePost(postId: $postId)

}


`

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

const DELETE_COMMENT_MUTATION= gql`


mutation deleteComment($postId:ID!, $commentId: ID!){

  deleteComment(postId: $postId, commentId: $commentId ){
    _id
    comments{
      _id
      userName
      createdAt
      body
    }
    commentCount
  }
}


`

