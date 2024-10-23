import React, {useEffect, useState} from "react";
import {jwtDecode} from "jwt-decode";

const Test = () => {
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            const userData = jwtDecode(token);
            console.log(userData);
            if(userData){
                setUsername(userData.sub+'');
            }
        }
    }, []);
    return(
        <div>
            {
                username && <div>Xin chao, {username} </div>
            }
        </div>
    );
}
export default Test;