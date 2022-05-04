import React, {SyntheticEvent, useState} from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'


const Login = (props: {setName: (name: string) => void}) => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [password, setPassword] = useState('');


    const Submit = async (e: SyntheticEvent) => {
        const MySwal = withReactContent(Swal)
        e.preventDefault();
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, password})
        });

        if(response.ok)
        {
            const content = await response.json();
            props.setName(content.name);
            localStorage.setItem("logged_user", "true");

            MySwal.fire({
            icon: 'success',
            title: <p>Sėkmingai prisijungėte!</p>,
            showConfirmButton: false,
            showCancelButton: false,
            showCloseButton: false,
            timer: 1200
            //didOpen: () => {
                //MySwal.clickConfirm()
            //}
            }).then(() =>{
                navigate('/user');
            })
        }
        else{
            MySwal.fire({
                icon: "error",
                title: <p>Neteisingi prisijungimo duomenys!</p>,
                text: "Patikrinkite ar teisingai įrašėte prisijungimo vardą bei slaptažodį."
                });
        }

    }




    return (
        <div>
            <form onSubmit={Submit}>
                <h1 className="h3 mb-3 fw-normal">Please sign in</h1>
                <input type="name" className="form-control" placeholder="Name" required
                    onChange={e => setName(e.target.value)}
                />
                <input type="password" className="form-control" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign in</button>
            </form>
        </div>
    );
};

export default Login;