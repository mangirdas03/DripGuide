import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

//const Home = () => {
const Browse = (props: {name: string}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);

    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/Posts', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    console.log(response.headers.get("Date"))
                    const content = await response.json();
                    console.log(content);
                    setPosts(content);
                }
                else alert("Klaida");
                
            }
          )();
    }, []);

    const ViewDetails = async (post: any) => {
        navigate('./item/' + post.id);
    }


    return (
        <div>
            <ul>
                {
                    posts.map((post, key) => {
                        return(
                            <button onClick={() => ViewDetails(post)}>
                                
                                <li key={post.id}>
                                <p>{post.id}</p>
                                <p>{post.title}</p>
                                <p>{post.description}</p>
                                <p>{post.description2}</p>
                                <p>{key}</p>
                                </li>
                            </button>
                        )
                    
                    }
                    

                    
                    
                    )
                }
            </ul>
            <p>BROWSE page</p>
            <p>aaaa</p>

        </div>
    );
};

export default Browse;