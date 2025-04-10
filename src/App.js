import "./index.css"
import './App.css';
import { Button } from '@mui/material';

import Signup from './Components/SignUp';
import Dashboard from './Components/Dashboard';
import Login from './Components/Login';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';


function App() {
  return (
    <div className="App">


<BrowserRouter>

<Routes>

<Route path="/" element={<Signup></Signup>}></Route>
<Route path="/Login" element={<Login></Login>}></Route>
<Route path="/dashboard" element={<Dashboard/>}></Route>

</Routes>

</BrowserRouter>



    </div>
  );
}

export default App;
