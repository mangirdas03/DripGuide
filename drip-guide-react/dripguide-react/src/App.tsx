import React, { useContext, useEffect, useState } from 'react';
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
  Routes,
  useNavigate
} from "react-router-dom";
import Item from './pages/Item';
import Add from './pages/Add';
import Pending from './pages/Pending';
import Review from './pages/Review';
import PBrowse from './pages/Browse';
import Edit from './pages/Edit';
import useLocalStorage from 'use-local-storage'
import Users from './pages/Users';

function App() {
  const [name, setName] = useState("");
  const [role, setRole] = useState(false);
  const [mail, setMail] = useState("");
  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  useEffect( () =>{
      (
        async () => {
            const response = await fetch('http://localhost:8000/api/user', {
                headers: {'Content-Type': 'application/json'},
                credentials: 'include'
            });
            const content = await response.json();
            setName(content.name);
            setRole(content.role);
            setMail(content.email);
        }
      )();
  });





 function RequireAuth({ children, redirectTo }:{children:any, redirectTo: any}) {
  if(!name)
    return <Navigate to={redirectTo}/>;
  return children;

  // async function CheckUser() {
  //   var response = await fetch('http://localhost:8000/api/user', {
  //      headers: {'Content-Type': 'application/json'},
  //      credentials: 'include'
  //   });
  //   const content = await response.json();
  //   if(content.name)
  //     setName(content.name)
  //   else setName("un")
    
  // }
  // CheckUser()
  // while(name === ""){}
  // if(name && name !== "un")
  //   return children;
  // else{
  //   if(name === 'un')
  //     setName("");
  //   return <Navigate to={redirectTo}/>;
  // }



  //   useEffect( () =>{
  //     (
  //       async () => {
  //           const response = await fetch('http://localhost:8000/api/user', {
  //               headers: {'Content-Type': 'application/json'},
  //               credentials: 'include'
  //           });
  //           const content = await response.json();
  //           if(content.name)
  //             setName(content.name);
  //       }
  //     )();
  //   },[]);
  //   if(!name) return null

  // //checkUser();
  // //if(name)
  //   return children
  // else{
  //   return <Navigate to={redirectTo}/>;
  // } 
    // console.log("Auth: " + name)
    // if(name){
    //   return children
    // }
    // else{
    //   return <Navigate to={redirectTo}/>
    // } 

  //var isLogged = localStorage.getItem("logged_user");
      // //var isLogged = getUser();
      // if(isLogged != "true")
      // {
      //   return <Navigate to={redirectTo}/>
      // }
      // else if(isLogged == "true"){
      //   return children
      // }
    //const [isAUth, setAuth] = useState(false);

    // useEffect(() => {
    //   async function getToken() {
    //      var response = await fetch('http://localhost:8000/api/user', {
    //         headers: {'Content-Type': 'application/json'},
    //         credentials: 'include'
    //     });
    //     const content = await response.json();
    //     if(content.name)
    //       setAuth(true);
    //       return;
    //   }
    //   getToken();
    // }, [isAUth])

    //console.log(isAUth)
    //if(isLogged == "true"){
    //  return children;
    //}
    //return <Navigate to={redirectTo}/>;
  }

  function RequireAdmin({ children, redirectTo }:{children:any, redirectTo: any}) {
    if(!name && !role)
      return <Navigate to={redirectTo}/>;
    return children;
    //var answer = false;
    
    // var answer = async function CheckAdmin() {
    //   var response = await fetch('http://localhost:8000/api/user', {
    //      headers: {'Content-Type': 'application/json'},
    //      credentials: 'include'
    //   });
    //   const content = await response.json();
    //   if(content.name && content.role){
    //     setRole(content.role)
    //     setName(content.name)
    //   }
      
    // }
    //const navigate = useNavigate();
      // var a = async () => {
      //     const response = await fetch('http://localhost:8000/api/user', {
      //         headers: {'Content-Type': 'application/json'},
      //         credentials: 'include'
      //     });
      //     const content = await response.json();
      //     if(!content.name && !content.role)
      //       navigate(redirectTo)
      // }
    //   var user;
    //   var admin;


    // fetch('http://localhost:8000/api/user', {
    //   headers: {'Content-Type': 'application/json'},
    //   credentials: 'include'
    // }).then(response => response.json())
    // .then(content =>{
    //   user = content.name;
    //   admin = content.role;

    // });

    // var a = useEffect(() => {
    //    // This is be executed when the state changes
       
    // }, []);


    // console.log(user)
    // console.log(admin)
    // if(user && admin)
    //   return children;
    // else return <Navigate to={redirectTo}/>;
  }

  function UnauthorizedOnly({ children, redirectTo }:{children:any, redirectTo: any}) {
    if(!name && !role)
      return children
    return <Navigate to={redirectTo}/>;
  }


  return (
    <div className="App" data-theme={theme}>
      <BrowserRouter>
        <Navbar name={name} setName={setName} role={role} setRole={setRole} theme={theme} setTheme={setTheme}/>
        <div className='container-main'>

          <Routes>
          <Route path="/" element={<Home name={name}/>} />
            {/* <Route path="/login" element={<Login setName={setName}/>}/> */}
            {/* <Route path="/register" element={<Register/>} /> */}
            <Route path="/register" element={
              <UnauthorizedOnly redirectTo="/">
                <Register/>
              </UnauthorizedOnly>
            }/>
            <Route path="/login" element={
              <UnauthorizedOnly redirectTo="/">
                <Login setName={setName}/>
              </UnauthorizedOnly>
            }/>
            <Route path="/user" element={
              <RequireAuth redirectTo="/">
                <User name={name} role={role} mail={mail}/>
              </RequireAuth>
            }/>
            <Route path="/browse" element={<PBrowse name={name}/>} />
            <Route path="/browse/all" element={<PBrowse name={name}/>} />
            <Route path="/browse/filter=:query" element={<PBrowse name={name}/>} />
            <Route path="/browse/item/:id" element={<Item role={role} name={name} />} />
            <Route path="/add" element={
              <RequireAuth redirectTo="/">
                <Add name={name} role={role}/>
              </RequireAuth>
            }/>
            <Route path="/browse/edit/:id" element={
              <RequireAdmin redirectTo="/">
                <Edit name={name}/>
              </RequireAdmin>
            }/>

            {/* <Route path="/pending" element={<Pending name={name}/>} />
            <Route path="/pending/item/:id" element={<Review match={name}/>} /> */}
            <Route path="/pending" element={
              <RequireAdmin redirectTo="/">
                <Pending name={name} role={role}/>
              </RequireAdmin>
            } />
            <Route path="/pending/item/:id" element={
              <RequireAdmin redirectTo="/">
                <Review match={name}/>
              </RequireAdmin>
            } />

            <Route path="/users" element={
              <RequireAdmin redirectTo="/">
                <Users name={name} role={role}/>
              </RequireAdmin>
            } />

          </Routes>
          </div>
      </BrowserRouter>

      <div className='footer'>
      <a href='https://ktu.edu/' target="_blank" className="footer-left"><strong>&copy; 2022 KTU</strong></a>
        <div className="footer-center">
          <a href='https://www.google.com/' target="_blank" className="fa fa-google"></a>
          <a href='https://www.facebook.com/' target="_blank" className="fa fa-facebook"></a>
          <a href='https://www.instagram.com/' target="_blank" className="fa fa-instagram"></a>
          <a href='https://twitter.com/' target="_blank" className="fa fa-twitter"></a>
        </div>
        <p className="footer-right"><strong>Mangirdas Šakėnas IFF-9/1</strong></p>
      </div>
    {/* <button onClick={switchTheme} >Switch to {theme === 'light' ? "Dark" : "Light"}</button> */}
    </div>
  );
}

export default App;
