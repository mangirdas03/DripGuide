import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = (props: {name: string, setName: (name: string) => void}) => {
  const [suggest, setSuggest] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();

    const logout = async () =>{
      await fetch('http://localhost:8000/api/logout', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        props.setName("")
        localStorage.setItem("logged_user", 'false');
    }

    const changeHandler = (e : any) => {
      var input = e.target.value;
      setInput(input);
      if(!input.trim().length || e.target.value.length < 3)
      {
        setSuggest([]);
      }
      else
      {
          //console.log(e.target.value);
          const getPosts = async () => {
              const res = await fetch(`http://localhost:8000/api/Posts/Suggestions/${e.target.value}`);
              const data = await res.json();
              setSuggest(data);
              //console.log(data)
          };
          getPosts();

      }
      // e.preventDefault();
      // if (e.target.value.trim() === ""){
      //     setExpanded(false);
      //     setNoTvShows(false);
      // } 
  
      // setSearchQuery(e.target.value);
  }
  const ViewDetails = async (post: any) => {
    setSuggest([])
    setInput('');
    //e.target.value = '';
    navigate('pbrowse/item/' + post.id);
    window.location.reload();
}
const SearchFor = async () => {
  setSuggest([])
  setInput('');
  navigate('/pbrowse/filter=' + input);
  window.location.reload();
}
   

    let menu;
    if(!props.name){
      menu = (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
          <li className="nav-item">
            <Link className="nav-link" to="/pbrowse">Browse</Link>
          </li>
        </ul>
      )
    }else{
      menu = (
        <ul className="navbar-nav me-auto mb-2 mb-md-0">
         
          <li className="nav-item">
            <Link className="nav-link" to="/pbrowse">Browse</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/add">Add</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/pending">Pending</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user">User settings</Link>
          </li>
        </ul>
      )
    }
    let right;
    if(!props.name){
      right = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/register">Register</Link>
          </li>
        </ul>
      )
    }else{
      right = (
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" onClick={logout} to="/register">Logout</Link>
          </li>
        </ul>
      )
    }

    return (
            <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">Logo</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
          <form className="d-flex">
              <input onChange={changeHandler} value={input} className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              
              <div className="dropdown-search">
                    {
                        suggest.map((post, key) => {
                            return(
                              <div key={key} className="dropdown-search-item" onClick={() => ViewDetails(post)}>
                                  <div className="dropdown-search-image-container">
                                      <img className="dropdown-search-image"  src={post.image}></img>
                                  </div>
                                  <div className="dropdown-search-text">
                                    {post.title}</div>
                                </div>
                            )})
                    }
                </div>
              <button className="btn btn-outline-success" onClick={SearchFor}>Search</button>
              
            </form>
            {menu}
            {right}
          </div>
        </div>
      </nav>
    );
};

export default Navbar;