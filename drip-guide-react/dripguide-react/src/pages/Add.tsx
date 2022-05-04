import React, {SyntheticEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Add = (props: {name: string}) => {
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState('');
    const [description2, setDescription2] = useState('');
    const [material, setMaterial] = useState('');
    const [price, setPrice] = useState('');
    const [releasedate, setReleaseDate] = useState('');
    const [stylecode, setStyleCode] = useState('');
    const [colorway, setColorway] = useState('');
    const [FK_Brand, setBrand] = useState('');
    const [image, setImage] = useState('');

    const Submit = async (e: SyntheticEvent) => {
        const MySwal = withReactContent(Swal)
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/Posts', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({title, description, description2, material, price, releasedate, stylecode, colorway, FK_Brand, image})
        });

        if(response.ok)
        {
            const content = await response.json();
            //props.setName(content.name);
            //localStorage.setItem("logged_user", "true");

            MySwal.fire({
            icon: 'success',
            title: <p>Sėkmingai prideta!</p>,
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            timer: 1200
            //didOpen: () => {
                //MySwal.clickConfirm()
            //}
            }).then(() =>{
                navigate('/browse');
            })
        }
        else{
            MySwal.fire({
                icon: "error",
                title: <p>Klaida!</p>,
                text: "liudesys."
                });
        }

    }




    return (
        <div>
            <form onSubmit={Submit}>
                <h1 className="h3 mb-3 fw-normal">Add new item</h1>
                <input type="title" className="form-control" placeholder="Title" required
                    onChange={e => setTitle(e.target.value)}
                />
                <input type="description" className="form-control" placeholder="Desc" required
                    onChange={e => setDescription(e.target.value)}
                />
                 <input type="description2" className="form-control" placeholder="Desc2" required
                    onChange={e => setDescription2(e.target.value)}
                />
                <input type="material" className="form-control" placeholder="Material" required
                    onChange={e => setMaterial(e.target.value)}
                />
                <input type="price" className="form-control" placeholder="Price" required
                    onChange={e => setPrice(e.target.value)}
                />
                <input type="date" className="form-control" placeholder="Release Date" required
                    onChange={e => setReleaseDate(e.target.value)}
                />
                <input type="code" className="form-control" placeholder="Code" required
                    onChange={e => setStyleCode(e.target.value)}
                />
                <input type="colorway" className="form-control" placeholder="Colorway" required
                    onChange={e => setColorway(e.target.value)}
                />
                <input type="brand" className="form-control" placeholder="Brand" required
                    onChange={e => setBrand(e.target.value)}
                />
                <textarea className="form-control" placeholder="Link to the image" required
                    onChange={e => setImage(e.target.value)}
                />
                

                <button className="w-100 btn btn-lg btn-primary" type="submit">Add</button>
            </form>
        </div>
    );
};

export default Add;