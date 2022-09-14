import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Route } from "react-router-dom";

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';

function App() {
  return (
   <BrowserRouter>
   <Route exact path="/" component={Home}></Route>
   <Route exact path="/login" component={Login}></Route>
   <Route exact path="/register" component={Register}></Route>
   </BrowserRouter>
  );
}

export default App;
