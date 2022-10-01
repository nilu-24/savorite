import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import Link from '@mui/material/Link';
import LogoutIcon from '@mui/icons-material/Logout';

import { AuthContext } from '../context/auth';

export default function Navbar() {

const {user, logout} = React.useContext(AuthContext);

//if we are logged in, 
const navBar = user? (<Box sx={{ flexGrow: 1, marginBottom: '100px' }}>
<AppBar position="fixed" sx={{backgroundColor:"#ff003b"}}>
  <Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
    >
      <RestaurantIcon />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    <Link sx={{color:"white", textDecoration:"none", fontFamily:"Pacifico", fontSize:"25px"}} href="/">Savorite.</Link>
    </Typography>
   
    <Button sx={{
                 '&:hover': {
        backgroundColor: 'black',
    },
    
    }} color="inherit"> <IconButton color="inherit">
      <LogoutIcon></LogoutIcon>
    </IconButton><Link sx={{color:"white", textDecoration:"none"}} onClick={logout}>Logout</Link></Button>
  </Toolbar>
</AppBar>
</Box>):(
<Box sx={{ flexGrow: 1, marginBottom: '100px' }}>
<AppBar position="fixed" sx={{backgroundColor:"#ff003b"}}>
  <Toolbar>
    <IconButton
      size="large"
      edge="start"
      color="inherit"
      aria-label="menu"
    >
      <RestaurantIcon />
    </IconButton>
    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
    <Link sx={{color:"white", textDecoration:"none", fontFamily:"Pacifico", fontSize:"25px"}} href="/">Savorite.</Link>
    </Typography>

    <Button sx={{

      marginRight:"5px",

'&:hover': {
        backgroundColor: 'black',
    },
    

    }}  color="inherit"><Link sx={{color:"white", textDecoration:"none"}} href="/login">Login</Link></Button>
    <Button sx={{

'&:hover': {
        backgroundColor: 'black',
    },
    
    }}
    
    color="inherit"><Link sx={{color:"white", textDecoration:"none"}} href="/register">Register</Link></Button>
  </Toolbar>




</AppBar>
</Box>
)

  return navBar;
}