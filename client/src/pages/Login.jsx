import * as React from 'react';
import TextField from '@mui/material/TextField';
import { Button, Card, CardContent, Grid, Typography } from '@mui/material';
import Link from '@mui/material/Link';
import { useMutation } from '@apollo/client';
import Navbar from '../components/Navbar';
import gql from "graphql-tag";
import { IconButton } from '@mui/material';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import LoginIcon from '@mui/icons-material/Login';
import { AuthContext } from '../context/auth';

export default function Login(props){


    //getting the context

    const context = React.useContext(AuthContext);

    const [errors, setErrors] = React.useState({});

    const [values, setValues] = React.useState({
        userName: "",
        password: ""
    });


    const onChange = (e)=>{
        setValues({...values, [e.target.name]:e.target.value})

    }


    const [logUser, {loading}] = useMutation(LOGIN_USER,{
        update(proxy, result){
           // console.log(result);
            context.login(result.data.login);
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
        logUser();
    }

    return (
        <div>
        <Navbar/>
<Card sx={{maxWidth:400, margin:"0 auto"}}>
    <CardContent>
    <Typography align="center" sx={{marginTop: "25px", marginBottom:"25px"}} gutterBottom variant="h6">
            Login to your account
            <IconButton sx={{marginLeft:"0px", marginBottom:"5px"}} aria-label="comment">
          <LoginIcon  />
        </IconButton>
        </Typography>
    <form onSubmit={onSubmit}>
        <Grid container spacing={1.5}>


        <Grid item xs={12}>
        <TextField error={errors.standard=="User Doesn't Exist."?true:false} required name="userName" value={values.userName} onChange={onChange} label = "Username" placeholder="Enter Username" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12} >
        <TextField error={errors.standard=="Login Failed. Enter Correct Credentials."?true:false} required type="password"  name="password" value={values.password} onChange={onChange} label = "Password" placeholder="Enter Password" variant="outlined" fullWidth>
        </TextField>
        </Grid>

        <Grid item xs={12}>
       <Button type = "submit" variant="contained" fullWidth>Login</Button>
        </Grid>

        </Grid>

        </form>
        <Typography sx={{marginTop:"25px"}}  variant="body2">
            Don't have an account? <Link href="/register" >Register</Link>
        </Typography>
    </CardContent>


{console.log(errors)}
    {Object.keys(errors).length>0?
<Stack spacing={1}> 
{Object.values(errors).map((error)=><Alert severity="error">{error}</Alert>)}
</Stack>
    :<div></div>}
    
</Card>

        </div>
    )

    }


const LOGIN_USER = gql`

mutation login(

$userName: String!
$password: String!
)

{
login(
        userName: $userName
        password: $password
){

    _id
    email
    userName
    createdAt
    token
}
}


`