import React, {SyntheticEvent, useState} from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [age, setAge] = useState('');
    const [password, setPassword] = useState('');
    const [confirm, setConfirm] = useState('');
    const navigate = useNavigate();

    const Submit = async (e: SyntheticEvent) => {
        e.preventDefault();
        await fetch('http://localhost:8000/api/register', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({name, password, age, email})
        });
        navigate('/login')
    }
    

    return (
        <div>
            <form onSubmit={Submit}>
                <h1 className="h3 mb-3 fw-normal">Please register</h1>
                <input type="name" className="form-control" placeholder="Name" required
                    onChange={e => setName(e.target.value)}
                />
                <input type="mail" className="form-control" placeholder="Email address" required
                    onChange={e => setEmail(e.target.value)}
                />
                <input type="age" className="form-control" placeholder="Age" required
                    onChange={e => setAge(e.target.value)}
                />
                <input type="password" className="form-control" placeholder="Password" required
                    onChange={e => setPassword(e.target.value)}
                />
                <input type="password" className="form-control" placeholder="Confirm password" required
                    onChange={e => setConfirm(e.target.value)}
                />
                <button className="w-100 btn btn-lg btn-primary" type="submit">Sign up</button>
            </form>
        </div>
    );
};

export default Register;