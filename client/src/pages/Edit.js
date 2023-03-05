import React, { useState ,useEffect} from 'react';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
const Edit = (props) => {
   const [postList, setPostList] = useState([]);
   const { search } = useLocation();
  const queryParams = new URLSearchParams(search);//for getting the params send from above page
  const postId = queryParams.get('postId');
  var id={"postId":postId}
    const [neww, setneww] = useState({
        title:"",
        word:"",
        postId:postId
      })

      const handleChange = e => {
        setneww({ ...neww, [e.target.id]: e.target.value });
      };//function for change related thing in neww
      var token=localStorage.getItem("auth_token");//authentication is stored in localstorage
      const handleclick = async (event) => {
        console.log(neww)
        const a = await fetch('http://localhost:1234/api/editpost', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(neww)
            })
            const res = await a.json()
            alert(res.status)
      };
    return(
        
        <>
        <h1>My Data</h1>
        <h1>Edit for Post {postId}</h1>
          {localStorage.getItem("auth_token")?(//if you login then show following stuff, they are the component to edit posts
            <>
            <TextField label="new title" variant='outlined' color='secondary' id="title"  value={neww.title} onChange={handleChange}/>
            <TextField label="new word" variant='outlined' color='secondary' id="word"  value={neww.word} onChange={handleChange}/>
            <p></p>
            <button id="edit"  onClick={handleclick}>edit</button>
            </>
          ):(
            <>
            <h1>no allowed to edit post without login</h1>

            </>
          )}
        </>
           

    );
};
export default Edit;
