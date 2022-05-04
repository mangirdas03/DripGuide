import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";

//const Home = () => {
const PBrowse = (props: {name: string}) => {
    const navigate = useNavigate();
    const [items, setItems] = useState<any[]>([]);
    const [pageCount, setpageCount] = useState(0);  
    const {id} = useParams();
  

    useEffect( () =>{
        (
          async () => {
            const getPosts = async () => {
              var res;
              if(!id){
                 res = await fetch(`http://localhost:8000/api/Posts/Page/1`);
              }
              else{
                 res = await fetch(`http://localhost:8000/api/Posts/Page/1/${id}`);
              } 
              const data = await res.json();
              setpageCount(Number(res.headers.get('Page-Count')));
              setItems(data);
          };
          getPosts();
        }
        )();
    }, []);


    const fetchPosts = async (currentPage : any) => {
        var res;
        if(!id){
           res = await fetch(`http://localhost:8000/api/Posts/Page/${currentPage}`);
        }
        else{
           res = await fetch(`http://localhost:8000/api/Posts/Page/${currentPage}/${id}`);
        } 
        const data = await res.json();
        return data;
      };

    const handlePageClick = async (data : any) => {
        let currentPage = data.selected + 1;
        const posts = await fetchPosts(currentPage);
        setItems(posts);
        window.scrollTo(0, 0)
      };


    const ViewDetails = async (post: any) => {
        navigate('./item/' + post.id);
    }

    return (



        <div>

            <ul>
                {
                    items.map((post, key) => {
                        return(
                            <button key={key} onClick={() => ViewDetails(post)}>
                                
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
            <p>{id}</p>
            <div>
            <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={3}
                onPageChange={handlePageClick}
                containerClassName={"pagination justify-content-center"}
                pageClassName={"page-item"}
                pageLinkClassName={"page-link"}
                previousClassName={"page-item"}
                previousLinkClassName={"page-link"}
                nextClassName={"page-item"}
                nextLinkClassName={"page-link"}
                breakClassName={"page-item"}
                breakLinkClassName={"page-link"}
                activeClassName={"active"}
            />
            </div>

        </div>
        
    );
};

export default PBrowse;