import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

//const Home = () => {
const Test = (props: {name: string}) => {
    const navigate = useNavigate();

    fetch('http://localhost:8000/api/Posts/Page/1')
    .then(res => {
    // do something
    console.log(res.headers.get('Page-Count'))
    })


    return (
        <div>
            <p>USER PAGE {props.name}.</p>
            <p>aaaa</p>

        </div>
    );
};

export default Test;