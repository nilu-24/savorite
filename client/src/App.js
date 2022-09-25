import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route } from "react-router-dom";

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import { AuthProvier } from './context/auth';
import AuthHandle from './context/authHandle';
import Navbar from './components/Navbar';
import SinglePost from "./pages/SinglePost";


function App() {
  return (

    <AuthProvier>
   <BrowserRouter>
   <Navbar/>
   <Route exact path="/" component={Home}></Route>
   <AuthHandle exact path="/login" component={Login}></AuthHandle>
   <AuthHandle exact path="/register" component={Register}></AuthHandle>
   <Route exact path="/posts/:postId" component={SinglePost} />
   </BrowserRouter>

   </AuthProvier>
  );
}

export default App;
