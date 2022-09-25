import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useMutation } from '@apollo/client';
import Navbar from '../components/Navbar';
import gql from "graphql-tag";
import { IconButton } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import { AuthContext } from '../context/auth';
import food from "../food.jpeg"


export default function Register(props){




    const context = React.useContext(AuthContext);

    const [errors, setErrors] = React.useState({});

    const [values, setValues] = React.useState({
        userName: "",
        password: "",
        email: "",
        confirmPassword: ""
    });


    const onChange = (e)=>{
        setValues({...values, [e.target.name]:e.target.value})

    }

    const [addUser, {loading}] = useMutation(REGISTER_USER,{
        update(proxy, result){
          //  console.log(result);
            context.login(result.data.register);
            //redirect to home once registered
            props.history.push('/');
        },

        onError(err){
            console.log(err.graphQLErrors[0].extensions.exception.err);
            setErrors(err.graphQLErrors[0].extensions.exception.err);
        },
        variables: values
    });

    const onSubmit = (e)=>{
        e.preventDefault();
        addUser();
    }



    return (
        <div>
        <Navbar/>
<Card sx={{maxWidth:400, margin:"0 auto"}}>
    <CardContent>
    <Typography align= "center" sx={{marginTop: "25px", marginBottom:"25px"}} gutterBottom variant="h6">
            Create a new account
            <IconButton sx={{marginLeft:"0px", marginBottom:"5px"}} aria-label="comment">
          <CreateIcon  />
        </IconButton>
        </Typography>
    <form onSubmit={onSubmit}>
        <Grid container spacing={1.5}>


        <Grid item xs={12}>
        <TextField error={errors.email?true:false} required type="email" name= "email" value={values.email} onChange={onChange} label = "Email" placeholder="Enter Email" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12}>
        <TextField error={errors.userName?true:false} required name="userName" value={values.userName} onChange={onChange} label = "Username" placeholder="Enter Username" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12} >
        <TextField error={errors.password?true:false} required type="password"  name="password" value={values.password} onChange={onChange} label = "Password" placeholder="Enter Password" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12} >
        <TextField error={errors.password?true:false} required type="password" name="confirmPassword" value={values.confirmPassword} onChange={onChange} label = "Confirm Password" placeholder="Enter Password" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12}>
       <Button type = "submit" variant="contained" fullWidth>Register</Button>
        </Grid>

        </Grid>

        </form>

        <Typography sx={{marginTop:"25px"}}  variant="body2">
            Already have an account? <Link href="/login" >Log in</Link>
        </Typography>
    </CardContent>

    {Object.keys(errors).length>0?

<Stack spacing={1}> 
{Object.values(errors).map((error)=><Alert severity="error">{error}</Alert>)}
</Stack>
    :<div></div>}
    
</Card>

        </div>
    )

    }


const REGISTER_USER = gql`

mutation register(

$userName: String!
$email: String!
$password: String!
$confirmPassword: String!
)

{
register(
    registerInput:{
        userName: $userName
        email: $email
        password: $password
        confirmPassword: $confirmPassword
    }
){

    _id
    email
    userName
    createdAt
    token
}
}


`