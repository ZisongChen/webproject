import React, { useState } from 'react';
const Register = () => {
    const [res, setres] = useState({
        email: "",
        password: ""
      })
      const handleChange = e => {
        setres({ ...res, [e.target.id]: e.target.value });
      };
      const handleclick = async (event) => {
        event.preventDefault(); // prevent the default form submission behavior
    
        try {
          const response = await fetch('http://localhost:1234/api/user/register/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(res)
          });
          const data = await response.json();
          console.log(data)
          alert(JSON.stringify(data))
        } catch (error) {
          console.error(error);
        }
      };
    return(
        <>
          <h1>Register</h1>
          <p id="m"></p>
          <input id="email" type="email" value={res.email} placeholder="email" onChange={handleChange}/>
          <input id="password" type="password" value={res.password} placeholder="password" onChange={handleChange}/>
          <input type="submit" id="register" onClick={handleclick}/>
        </>
           

    );
};
export default Register;