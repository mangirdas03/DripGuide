import React, { useEffect, useState } from 'react';
import Login from './pages/Login'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import User from './pages/User'
import Home from './pages/Home'
import './App.css';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes
} from "react-router-dom";
import Browse from './pages/Browse';
import Item from './pages/Item';
import Add from './pages/Add';
import Pending from './pages/Pending';
import Review from './pages/Review';
import PBrowse from './pages/PBrowse';
import Test from './pages/Test';


function App() {
  const [name, setName] = useState("");


  useEffect( () =>{
      (
        async () => {
            const response = await fetch('http://localhost:8000/api/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            const content = await response.json();

            setName(content.name);
        }

        
      )();
  });



async function getUser () {
  const response = await fetch('http://localhost:8000/api/user', {
      headers: {'Content-Type': 'application/json'},
      credentials: 'include'
  });
  const content = await response.json();
  console.log(content);
  if(!content)
    return false;
  else return true;
}


 function RequireAuth({ children, redirectTo }:{children:any, redirectTo: any}) {
      var isLogged = localStorage.getItem("logged_user");
      //var isLogged = getUser();
      if(isLogged != "true")
      {
        return <Navigate to={redirectTo}/>
      }
      else{
        return children
      }
   }

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar name={name} setName={setName}/>
        {/* <Navbar name={'a'}/> */}
        <div className="form-signin">
        
        <Routes>
        <Route path="/" element={<Home name={name}/>} />
          <Route path="/login" element={<Login setName={setName}/>}/>
          <Route path="/register" element={<Register/>} />
          <Route path="/user" element={
            <RequireAuth redirectTo="/login">
              <User name={name}/>
            </RequireAuth>
          }/>
          <Route path="/browse" element={<Browse name={name}/>} />
          <Route path="/pbrowse" element={<PBrowse name={name}/>} />
          <Route path="/pbrowse/filter=:id" element={<PBrowse name={name}/>} />
          <Route  path="/pbrowse/item/:id" element={<Item match={name} />} />
          <Route path="/add" element={<Add name={name}/>} />
          <Route path="/pending" element={<Pending name={name}/>} />
          <Route path="/pending/item/:id" element={<Review match={name}/>} />
          <Route path="/test" element={<Test name={name}/>} />
          {/* <Route path="/browse" element={
            <RequireAuth redirectTo="/login">
              <Browse name={name}/>
            </RequireAuth>
          }/> */}

        </Routes>
        </div>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
