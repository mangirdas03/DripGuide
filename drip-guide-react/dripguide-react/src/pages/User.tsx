import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//const Home = () => {
const User = (props: {name: string}) => {
    const navigate = useNavigate();


    return (
        <div>
            <p>USER PAGE {props.name}.</p>
            <p>aaaa</p>

        </div>
    );
};

export default User;