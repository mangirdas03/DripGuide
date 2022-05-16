import React, { SyntheticEvent, useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import ImageWithFallback from "../components/Image";

interface Post {
    title: string,
    description: string,
    description2: string;
  }

const Review = (props : any) => {
    const navigate = useNavigate();
    const {id} = useParams();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [releasedate, setReleaseDate] = useState('');
    const [stylecode, setStyleCode] = useState('');
    const [colorway, setColorway] = useState('');
    const [FK_Brand, setBrand] = useState('');
    const [image, setImage] = useState('');

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])


    //Old guard
    // useEffect(() => {
    //     async function getUser() {
    //        var response = await fetch('http://localhost:8000/api/user', {
    //           headers: {'Content-Type': 'application/json'},
    //           credentials: 'include'
    //       });
    //       const content = await response.json();
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
                const response = await fetch('http://localhost:8000/api/Posts/' + id, {
                    method: 'GET',
                    headers: {'Content-Type': 'application/json'},
                    credentials: 'include'
                });
                if(response.ok)
                {
                    const content = await response.json();
                    if(content.status === 1){
                        navigate('/browse/all');
                        window.location.reload();
                    }
                    setTitle(content.title);
                    setDescription(content.description);
                    setDescription2(content.description2);
                    setMaterial(content.material);
                    setPrice(content.price);
                    setReleaseDate(content.releaseDate.substr(0, 10));
                    setStyleCode(content.styleCode);
                    setColorway(content.colorway);
                    setBrand(content.fK_Brand);
                    setImage(content.image);
                    if(!content.image)
                        setImage("https://")
                }
                else alert("Error");
            }
          )();
    }, []);

    const ConfirmPost = async (e : SyntheticEvent) => {
        const MySwal = withReactContent(Swal)
        e.preventDefault();
        if([title, FK_Brand, description, material, price, colorway, stylecode].some(e => e.length < 2)){
            MySwal.fire({
                icon: "error",
                title: (<p>Please fill all the required fields!</p>),
                html: <p>At least 2 characters are needed for each input.</p>,
                color: 'white',
                background: '#3e4956',
                confirmButtonColor: 'lightblue'
                });
            return
        }
        MySwal.fire({
            title: 'Confirm submission?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue'
          }).then((result) => {
            if (result.isConfirmed) 
            {
                const foo = async () => {
                    const response = await fetch('http://localhost:8000/api/Posts/confirm/' + id, {
                        method: 'POST',
                        headers: {'Content-Type': 'application/json'},
                        credentials: 'include',
                        body: JSON.stringify({title, description, description2, material, price, releasedate, stylecode, colorway, FK_Brand, image})
                    });
                    if(response.ok)
                    {
                        e.preventDefault();
                        MySwal.fire({
                            icon: 'success',
                            title: <p>Submission confirmed!</p>,
                            showConfirmButton: false,
                            showCancelButton: false,
                            showCloseButton: false,
                            timer: 1200,
                            color: 'white',
                            background: '#3e4956',
                            confirmButtonColor: 'lightblue'
                            }).then(() =>{
                                navigate('/browse/item/' + id);
                            })
                    }
                    else alert("Error");
                }
                foo()
            } 
            else
            {
              return
            }
        })
    }
    const Delete = async () => {
        const MySwal = withReactContent(Swal)
        MySwal.fire({
            title: 'Are you sure you want to reject this submission?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Confirm',
            color: 'white',
            background: '#3e4956',
            confirmButtonColor: 'lightblue'
          }).then((result) => {
            if (result.isConfirmed) 
            {
                const foo = async () => {
                    const response = await fetch('http://localhost:8000/api/Posts/' + id, {
                    method: 'DELETE',
                    credentials: 'include'
                });
                if(response.ok)
                {
                    MySwal.fire({
                        icon: 'success',
                        title: <p>Submission rejected!</p>,
                        showConfirmButton: false,
                        showCancelButton: false,
                        showCloseButton: false,
                        timer: 1200,
                        color: 'white',
                        background: '#3e4956',
                        confirmButtonColor: 'lightblue'
                        }).then(() =>{
                            navigate('/pending');
                        })
                }
                else alert("Error");
                }
                foo()
            } 
            else
            {
              return
            }
        })
    }
    return (
        <div className="center-container-full">
            <div className="parent">
                <div className="grid-left-big"> 
                    <h1 className="center-text-title-smaller">Memo for administrators</h1>
                    <p className="grid-right-title">Carefully review this user submitted item and:</p>
                    <p className="container-text">◾ make sure all information is correct.</p>
                    <p className="container-text">◾ make necessary edits.</p>
                    <p className="container-text">◾ confirm or reject the submission.</p>
                    <br />

                    <h1 className="center-text-title-smaller">About the form</h1>
                    <p className="grid-right-title">Item title:</p>
                    <p className="container-text">The title/name of the item you are submitting. 
                    Do <u>not</u> write anything extra. Example: <i>Jordan 1 Shattered backboard.</i></p>
                    <p className="grid-right-title">Brand and/or designer:</p>
                    <p className="container-text">The name of brand and/or designer of the item. 
                    Example: <i>Nike, Tinker Hatfield.</i></p>
                    <p className="grid-right-title">Description:</p>
                    <p className="container-text">Detailed description of the item. Write everything that is <u >not covered in other fields</u>.</p>
                    <p className="grid-right-title">More description:</p>
                    <p className="container-text">Another description input field. Optional.</p>
                    <p className="grid-right-title">Materials</p>
                    <p className="container-text">Materials used for this item. Example: <i>Leather, rubber, polyester.</i></p>
                    <p className="grid-right-title">Retail price</p>
                    <p className="container-text">Retail price of the item. Feel free to use currency symbols. Example: <i>$220.</i></p>
                    <p className="grid-right-title">Style code</p>
                    <p className="container-text">Unique style code that most items have. Example: <i>555088-005.</i></p>
                    <p className="grid-right-title">Colorway</p>
                    <p className="container-text">Colorway/colors used for this item. Example: <i>WHITE/VARSITY RED-BLACK.</i></p>
                    <p className="grid-right-title">Image link</p>
                    <p className="container-text">Link to an image of the item. Optional. Recommended image size: at least 350x350 px. </p>
                </div>
                <div className="grid-right-big">
                    <h1 className="center-text-title">Submission review 📝</h1>
                    <form onSubmit={ConfirmPost}>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Item title <b title="Required" className="auth-required">*</b></p>
                            <input type="title" className="auth-input" placeholder="Title"
                                value={title} onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Brand and/or designer <b title="Required" className="auth-required">*</b></p>
                            <input type="brand" className="auth-input" placeholder="Brand, designer"
                                value={FK_Brand} onChange={e => setBrand(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Description <b title="Required" className="auth-required">*</b></p>
                            <textarea className="auth-input" placeholder="Description"
                                value={description} onChange={e => setDescription(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ More description</p>
                            <textarea className="auth-input" placeholder="Extra description (optional)"
                                value={description2} onChange={e => setDescription2(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Materials used <b title="Required" className="auth-required">*</b></p>
                            <input type="material" className="auth-input" placeholder="Material"
                                value={material} onChange={e => setMaterial(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Retail price <b title="Required" className="auth-required">*</b></p>
                            <input type="price" className="auth-input" placeholder="Price"
                                value={price} onChange={e => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Release date <b title="Required" className="auth-required">*</b></p>
                            <input type="date" className="auth-input" placeholder="Release Date" required
                                value={releasedate} onChange={e => setReleaseDate(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Unique style code <b title="Required" className="auth-required">*</b></p>
                            <input type="code" className="auth-input" placeholder="Code"
                                value={stylecode} onChange={e => setStyleCode(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Colorway <b title="Required" className="auth-required">*</b></p>
                            <input type="colorway" className="auth-input" placeholder="Colorway"
                                value={colorway} onChange={e => setColorway(e.target.value)}
                            />
                        </div>
                        <div className="auth-element">
                            <p className="auth-element-label">◾ Image link</p>
                            <textarea className="auth-input" placeholder="Image link"
                                value={image} onChange={e => setImage(e.target.value)}
                            />
                        </div>
                        <div className="card-icon">
                            <ImageWithFallback 
                                key={image}
                                className="card-image"
                                fallback={'/nopic.png'}
                                src={image}
                            />
                        </div>
                        <div className="auth-element">
                            <button className="btn btn-lg" type="submit">Confirm submission ✔️</button>
                            <div></div>
                            <button className="btn btn-lg" type="button" onClick={() => Delete()} >Reject submission ❌</button>
                        </div>
                    </form>
                </div>
            </div>
            {/* <p>Review</p>
            <p>{id}</p>
            {/* <p>{post.title}</p>
            // {JSON.stringify(post)} */}

            {/* <form onSubmit={ConfirmPost}>
                <input type="title" className="form-control" placeholder="Title" required
                    value={title} onChange={e => setTitle(e.target.value)}
                />
                <input type="description" className="form-control" placeholder="Desc" required
                    value={description} onChange={e => setDescription(e.target.value)}
                />
                 <input type="description2" className="form-control" placeholder="Desc2" required
                    value={description2} onChange={e => setDescription2(e.target.value)}
                />
                <input type="material" className="form-control" placeholder="Material" required
                    value={material} onChange={e => setMaterial(e.target.value)}
                />
                <input type="number" className="form-control" placeholder="Price" required
                    value={price} onChange={e => setPrice(e.target.value)}
                />
                <input type="code" className="form-control" placeholder="Code" required
                    value={stylecode} onChange={e => setStyleCode(e.target.value)}
                />
                <input type="colorway" className="form-control" placeholder="Colorway" required
                    value={colorway} onChange={e => setColorway(e.target.value)}
                />
                <input type="number" className="form-control" placeholder="Brand" required
                    value={FK_Brand} onChange={e => setBrand(e.target.value)}
                />
                <textarea className="form-control" placeholder="Link to the image" required
                    value={image} onChange={e => setImage(e.target.value)}
                />
                
                <button className="w-100 btn btn-lg btn-primary" type="submit">Confirm edits</button>
                <button className="w-100 btn btn-lg btn-danger" onClick={() => Delete()} >Delete</button>
                
            </form> */}
            
            {/* <input type="title" className="form-control" placeholder="Title" required
                    value={title} onChange={e => setTitle(e.target.value)}
                />

            <button onClick={() => ConfirmPost()}>Confirm</button>
            <button onClick={() => Delete()}>Delete</button> */}

            {/* <p>{props.post.title}</p>
            <p>{props.post.description}</p>
            <p>{props.post.description2}</p> */}
        </div>
    );
};

export default Review;

// import React, { SyntheticEvent, useEffect, useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Swal from "sweetalert2";
// import withReactContent from "sweetalert2-react-content";

// const Review = (props : any) => {
//     const navigate = useNavigate();
//     const {id} = useParams();
//     const [title, setTitle] = useState('');
//     const [description, setDescription] = useState('');
//     const [description2, setDescription2] = useState('');
//     const [material, setMaterial] = useState('');
//     const [price, setPrice] = useState('');
//     const [styleCode, setStyleCode] = useState('');
//     const [colorway, setColorway] = useState('');
//     const [fK_Brand, setBrand] = useState('');
//     const [image, setImage] = useState('');

//     // useEffect(() => {
//     //     async function getUser() {
//     //        var response = await fetch('http://localhost:8000/api/user', {
//     //           headers: {'Content-Type': 'application/json'},
//     //           credentials: 'include'
//     //       });
//     //       const content = await response.json();
//     //       console.log(props.name)
//     //       if(!content.name || content.role == false)
//     //       {
//     //         navigate('/');
//     //       }
//     //     }
//     //     getUser();

//     //   })


//     useEffect(() => {
//         (
//             async () => {
//                 const response = await fetch('http://localhost:8000/api/Posts/' + id, {
//                     method: 'GET',
//                     headers: {'Content-Type': 'application/json'},
//                     credentials: 'include'
//                 });
//                 if(response.ok)
//                 {
//                     const content = await response.json();
//                     if(content.status === 1){
//                         navigate('/pending');
//                         window.location.reload();
//                     }
//                     //setPost(content);
//                     setTitle(content.title);
//                     setDescription(content.description);
//                     setDescription2(content.description2);
//                     setMaterial(content.material);
//                     setPrice(content.price);
//                     //setReleaseDate(content.releaseDate);
//                     setStyleCode(content.styleCode);
//                     setColorway(content.colorway);
//                     setBrand(content.fK_Brand);
//                     setImage(content.image);
//                     //console.log(content);
//                     if(!image){
//                         setImage("https://")
//                     }

//                 }
//                 else alert("Error");
//             }
//           )();
//     }, []);

//     const ConfirmPost = async (e: SyntheticEvent) => {
//         const MySwal = withReactContent(Swal)
//         e.preventDefault();
//         const response = await fetch('http://localhost:8000/api/Posts/confirm/' + id, {
//                     method: 'POST',
//                     headers: {'Content-Type': 'application/json'},
//                     credentials: 'include',
//                     body: JSON.stringify({title, description, description2, material, price, styleCode, colorway, fK_Brand, image})
//                 });
//                 if(response.ok)
//                 {
//                     //const content = await response.json();
//                     //alert(content.title);
//                     //setPost(content);
//                     //alert("prideta")
//                     //navigate('/pbrowse/all');
//                     MySwal.fire({
//                         icon: 'success',
//                         title: <p>Sėkmingai patvirtinta!</p>,
//                         showConfirmButton: false,
//                         showCancelButton: false,
//                         showCloseButton: false,
//                         timer: 1200
//                         //didOpen: () => {
//                             //MySwal.clickConfirm()
//                         //}
//                         }).then(() =>{
//                             navigate('/pending');
//                         })


//                 }
//                 else alert("Klaida");
//     }
//     const Delete = async () => {
//         const MySwal = withReactContent(Swal)
//         const response = await fetch('http://localhost:8000/api/Posts/' + id, {
//                     method: 'DELETE',
//                     //headers: {'Content-Type': 'application/json'},
//                     credentials: 'include'
//                 });
//                 if(response.ok)
//                 {
//                     MySwal.fire({
//                         icon: 'success',
//                         title: <p>Sėkmingai ištrinta!</p>,
//                         showConfirmButton: false,
//                         showCancelButton: false,
//                         showCloseButton: false,
//                         timer: 1200
//                         //didOpen: () => {
//                             //MySwal.clickConfirm()
//                         //}
//                         }).then(() =>{
//                             navigate('/pending');
//                         })


//                 }
//                 else alert("Klaida");
//     }



//     return (
//         <div>
//             <p>Review</p>
//             <p>{id}</p>
//             {/* <p>{post.title}</p>
//             // {JSON.stringify(post)} */}

//             <form onSubmit={ConfirmPost}>
//                 <input type="title" className="form-control" placeholder="Title" required
//                     value={title} onChange={e => setTitle(e.target.value)}
//                 />
//                 <input type="description" className="form-control" placeholder="Desc" required
//                     value={description} onChange={e => setDescription(e.target.value)}
//                 />
//                  <input type="description2" className="form-control" placeholder="Desc2" required
//                     value={description2} onChange={e => setDescription2(e.target.value)}
//                 />
//                 <input type="material" className="form-control" placeholder="Material" required
//                     value={material} onChange={e => setMaterial(e.target.value)}
//                 />
//                 <input type="number" className="form-control" placeholder="Price" required
//                     value={price} onChange={e => setPrice(e.target.value)}
//                 />
//                 {/* <input type="date" className="form-control" placeholder="Release Date" required
//                     value={releasedate} onChange={e => setReleaseDate(e.target.value)}
//                 /> */}
//                 <input type="code" className="form-control" placeholder="Code" required
//                     value={styleCode} onChange={e => setStyleCode(e.target.value)}
//                 />
//                 <input type="colorway" className="form-control" placeholder="Colorway" required
//                     value={colorway} onChange={e => setColorway(e.target.value)}
//                 />
//                 <input type="number" className="form-control" placeholder="Brand" required
//                     value={fK_Brand} onChange={e => setBrand(e.target.value)}
//                 />
//                 <textarea className="form-control" placeholder="Link to the image" required
//                     value={image} onChange={e => setImage(e.target.value)}
//                 />
                
//                 <button className="w-100 btn btn-lg btn-primary" type="submit" >Confirm</button>
//                 <button className="w-100 btn btn-lg btn-danger" onClick={() => Delete()} >Delete</button>
//             </form>
            
//             {/* <input type="title" className="form-control" placeholder="Title" required
//                     value={title} onChange={e => setTitle(e.target.value)}
//                 />

//             <button onClick={() => ConfirmPost()}>Confirm</button>
//             <button onClick={() => Delete()}>Delete</button> */}

//             {/* <p>{props.post.title}</p>
//             <p>{props.post.description}</p>
//             <p>{props.post.description2}</p> */}
//         </div>
//     );
// };

// export default Review;