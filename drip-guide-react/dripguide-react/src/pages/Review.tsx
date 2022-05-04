import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const Review = (props : any) => {
    const navigate = useNavigate();
    const [post, setPost] = useState([] as any[]);
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
                    setPost(content);
                }
                else alert("Klaida");
                
            }
          )();
    }, []);

    const ConfirmPost = async () => {
        const MySwal = withReactContent(Swal)
        const response = await fetch('http://localhost:8000/api/Posts/confirm/' + id, {
                    method: 'POST',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    //const content = await response.json();
                    //alert(content.title);
                    //setPost(content);

                    MySwal.fire({
                        icon: 'success',
                        title: <p>Sėkmingai patvirtinta!</p>,
                        showConfirmButton: false,
                        showCancelButton: false,
                        showCloseButton: false,
                        timer: 1200
                        //didOpen: () => {
                            //MySwal.clickConfirm()
                        //}
                        }).then(() =>{
                            navigate('/pending');
                        })


                }
                else alert("Klaida");
    }
    const Delete = async () => {
        const MySwal = withReactContent(Swal)
        const response = await fetch('http://localhost:8000/api/Posts/' + id, {
                    method: 'DELETE',
                    //headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    //const content = await response.json();
                    //alert(content.title);
                    //setPost(content);

                    MySwal.fire({
                        icon: 'success',
                        title: <p>Sėkmingai ištrinta!</p>,
                        showConfirmButton: false,
                        showCancelButton: false,
                        showCloseButton: false,
                        timer: 1200
                        //didOpen: () => {
                            //MySwal.clickConfirm()
                        //}
                        }).then(() =>{
                            navigate('/pending');
                        })


                }
                else alert("Klaida");
    }



    return (
        <div>
            <p>Review</p>
            <p>{id}</p>
            


            {JSON.stringify(post)}
            
               for (let [key, value] of Object.entries(post)) {
                
              }


           
             
            <button onClick={() => ConfirmPost()}>Confirm</button>
            <button onClick={() => Delete()}>Delete</button>

            {/* <p>{props.post.title}</p>
            <p>{props.post.description}</p>
            <p>{props.post.description2}</p> */}
        </div>
    );
};

export default Review;