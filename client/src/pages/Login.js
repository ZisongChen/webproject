import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from '@mui/material';
const Login = () => {
    
    const [log, setlog] = useState({
        email: "",
        password: "",
        login:false
      })
      const handleChange = e => {
        setlog({ ...log, [e.target.id]: e.target.value });
      };
      const logout=()=>{
        //when you choose to logout it will remove the authentication from localstorage
        localStorage.removeItem("auth_token");
        setlog({ ...log, login: false })
      }

      const handleclick = async (event) => {
        event.preventDefault(); // prevent the default form submission behavior
    

          const response = await fetch('http://localhost:1234/api/user/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(log)
          });
          const data = await response.json();
          if(data.success){
            
          alert("login successfully")
          localStorage.setItem("auth_token", data.token);// save the authentication in localstorage
            setlog({ ...log, login: true })
          }else{
          alert(JSON.stringify(data.msg))
          }

      };
    return(
        <>
          
          {localStorage.getItem("auth_token")?(//if  login show log out
            <>
            <h1>logout</h1>
            <button onClick={logout}>logout</button>
            </>
          ):(
            <>
            <h1>login</h1>
            <p id="m"></p>
            <input id="email" type="email" value={log.email} placeholder="email" onChange={handleChange}/>
            <input id="password" type="password" value={log.password} placeholder="password" onChange={handleChange}/>
            <input type="submit"  onClick={handleclick}/>
            </>
          )}
        </>
           

    );
};
export default Login;
