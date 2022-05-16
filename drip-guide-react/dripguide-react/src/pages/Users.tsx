import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ImageWithFallback from "../components/Image";

//const Home = () => {
const Users = (props: {name: string, role: boolean}) => {
    const navigate = useNavigate();
    const [posts, setPosts] = useState<any[]>([]);
    const [reset, setReset] = useState(false);
    const [pageCount, setpageCount] = useState(0);  
    const [page, setPage] = useState(0);  

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    
    // useEffect(() => {
    //     async function getUser() {
    //        var response = await fetch('http://localhost:8000/api/user', {
    //           headers: {'Content-Type': 'application/json'},
    //           credentials: 'include'
    //       });
    //       const content = await response.json();
    //       //console.log("Pending useEffect")
    //       console.log(props.name)
    //       if(!content.name || content.role == false)
    //       {
    //         navigate('/');
    //       }
    //     }
    //     getUser();
    //   })
      
    useEffect(() => {
        (
            async () => {
                const response = await fetch('http://localhost:8000/api/users/1', {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    const content = await response.json();
                    //console.log(content);
                    
                    setpageCount(Number(response.headers.get('Page-Count')));
                    setPosts(content);
                    setPage(1);
                }
                else alert("Error");
            }
          )();
    }, [reset]);

    const changeRole = async (id : number) => {
        const MySwal = withReactContent(Swal)
        var res = await fetch(`http://localhost:8000/api/changerole/${id}`, {
            method: 'POST',
            credentials: 'include'
        });
        if(res.ok){
            MySwal.fire({
                icon: "success",
                title: (<p>Role changed!</p>),
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            fetchUsers(page);
        }
        else{
            MySwal.fire({
                icon: "error",
                title: (<p>Error has occured!</p>),
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return;
        }
    };

    const deleteUser = async (id : number, nam: string) => {
        console.log(id)
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure you want to delete user '+nam+'?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue'
          }).then((result) => {
            if(result.isConfirmed){
                (async () => {
                    var res = await fetch(`http://localhost:8000/api/deleteuser/${id}`, {
                    method: 'POST',
                    credentials: 'include'
                    });
                    if(res.ok){
                        MySwal.fire({
                            icon: "success",
                            title: (<p>User deleted!</p>),
                            color: 'white',
                            background: '#3e4956',
                            confirmButtonColor: 'lightblue'
                            });
                        if(reset)
                            setReset(false);
                        else setReset(true);
                    }
                    else{
                        MySwal.fire({
                            icon: "error",
                            title: (<p>Error has occured!</p>),
                            color: 'white',
                            background: '#3e4956',
                            confirmButtonColor: 'lightblue'
                            });
                        return;
                    }
                })();  
            }
          })
    };


    const fetchUsers = async (currentPage : any) => {
        var res = await fetch(`http://localhost:8000/api/users/${currentPage}`,
        {
            method: 'GET',
            headers: {'Content-Type': 'application/json'},
            credentials: 'include'
        });
        const data = await res.json();
        setPosts(data);
      };

    const handlePageClick = async (data : any) => {
        let currentPage = data.selected + 1;
        setPage(currentPage);
        await fetchUsers(currentPage);
        window.scrollTo(0, 0)
      };



    return (
        <div className="center-container" data-theme={localStorage.getItem('theme')}>
            <h1 className="center-text-title">Website users</h1>
            <p className="container-text">You, as an administrator, are able to promote, demote or delete users.</p>
            
            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>E-mail address</th>
                        <th>Role</th>
                        <th>Change role</th>
                        <th className="table-text">Delete user</th>
                    </tr>
                </thead>
                <tbody>
                    {
                    posts.map((post, key) => {
                        return(
                            <tr key={key}>
                                <td>{key+1}</td>
                                <td>{post.name}</td>
                                <td>{post.email}</td>
                                <td>{post.role ? "Administrator" : "User"}</td>
                                <td>
                                    {post.role ? <button className="btn btn-sm" type="button" onClick={() => changeRole(post.id)} >🔻Demote</button> : <button className="btn btn-sm" type="button" onClick={() => changeRole(post.id)} >🔺Promote</button>}
                                </td>
                                <td className="table-text">
                                    <button className="btn btn-sm" type="button" onClick={() => deleteUser(post.id, post.name)} >❌</button>
                                </td>
                            </tr>
                        )
                    })
                    }
                    
                </tbody>
                </table>
            <table>
            <th>

            </th>
            
            
            </table>
            <ReactPaginate
                previousLabel={"<"}
                nextLabel={">"}
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
                disabledClassName={"page-disabled"}
            />
        </div>
    );
};

export default Users;