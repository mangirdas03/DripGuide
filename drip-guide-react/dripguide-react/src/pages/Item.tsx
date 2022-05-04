import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";

const Item = (props : any) => {
    const navigate = useNavigate();
    const [post, setPost] = useState([]);
    const [pic, setPic] = useState("");
    const {id} = useParams();


    useEffect(() => {
        (
            async () => {


                const response = await fetch('http://localhost:8000/api/Posts/' + id, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    const content = await response.json();
                    //alert(content.title);
                    setPost(content.title);
                    if(content.image){
                        setPic(content.image);
                    }
                    
                }
                else alert("Klaida");
                
            }
          )();
    }, []);




    return (
        <div>
            <p>aa</p>
            <p>{id}</p>
            <p>{post}</p>
            <div className="item-image-div">
                <img className="item-image" alt="No image" src={pic}></img>
            </div>
            {/* <p>{props.post.title}</p>
            <p>{props.post.description}</p>
            <p>{props.post.description2}</p> */}

        </div>
    );
};

export default Item;