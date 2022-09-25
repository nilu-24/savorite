import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import { useMutation } from '@apollo/client';
import gql from "graphql-tag";
import { IconButton } from '@mui/material';
import FileBase64 from 'react-file-base64';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


export default function Form(){

    const [values, setValues] = React.useState({
        title:"",
        body:"",
        restaurant:"",
        location:"",
        tags:[],
        image:""
    });

    const onChange = (e)=>{
        setValues({...values, [e.target.name]:e.target.value})
    }

    const [createPost, {error}] = useMutation(CREATE_POST_MUTATION,{
        update(proxy, result){
         const data =   proxy.readQuery({
                query: FETCH_POSTS_QUERY
            })

        let newData = [...data.getPosts];
      newData = [result.data.createPost, ...newData];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data: {
          ...data,
          getPosts: {
            newData,
          },
        },
      });

        },
        onError(error){
            console.log(error)
            
        },
        variables: values
    });

    const onSubmit = (e)=>{
        e.preventDefault();
        createPost();
        document.getElementById("post-form").reset()
    }


    return (

        <div>
            <Card sx={{maxWidth:400, margin:"0 auto"}}>
    <CardContent>
    <Typography sx={{marginTop: "25px", marginBottom:"25px"}} gutterBottom variant="h6">
            Share your favorite dish
            <IconButton sx={{marginLeft:"0px", marginBottom:"5px"}} aria-label="food">
          <LocalDiningIcon  />
        </IconButton>
        </Typography>
    <form id="post-form" onSubmit={onSubmit} >
        <Grid container spacing={1.5}>

        <Grid item xs={12}>
        <TextField onChange={onChange}  required name="title"  label = "Title" placeholder="Enter name of the item" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12} >
        <TextField multiline minRows={4} onChange={onChange}  required  name="body"  label = "Review" placeholder="Describe your experience" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12} >
        <TextField onChange={onChange}  required  name="restaurant"  label = "Restaurant" placeholder="Enter restaurant name" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12} >
        <TextField onChange={onChange}   required  name="location"  label = "Location" placeholder="Enter location" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12} >
        <TextField onChange={(e)=>{
            var tags = e.target.value.split(',');
            setValues({...values, tags: tags})

        }}   name="tags"  label = "Tags" placeholder="Seperate tags by comma" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12} >
        <Typography variant="body1">Upload Image
        <IconButton aria-label="photo">
          <AddPhotoAlternateIcon  />
        </IconButton>
        </Typography>
        
        <br></br>


        <FileBase64
        multiple={ false }
        onDone={ ({base64})=>{
            setValues({...values, image:base64})
        } } />
        </Grid>


        <Grid item xs={12}>
       <Button type = "submit" variant="contained" fullWidth>Share</Button>
        </Grid>

        </Grid>

        </form>
    </CardContent>
    
</Card>
        </div>
    );
}


const CREATE_POST_MUTATION = gql`


mutation createPost(
    $title: String!
    $body: String!
    $location: String!
    $restaurant: String!
    $tags: [String]!
    $image: String!
)
{

createPost(

    title:$title,
    body: $body,
    location: $location, 
    restaurant: $restaurant,
    tags: $tags,
    image:$image
)

{
    _id
    body
    userName
    createdAt
    image
    restaurant
    title
    tags
    location

    likes{
        userName
        _id 
        createdAt
    }
    dislikes{
        userName
        _id 
        createdAt
    }

    comments{
        userName
        _id 
        createdAt
        body
    }
likeCount
dislikeCount
commentCount
}

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