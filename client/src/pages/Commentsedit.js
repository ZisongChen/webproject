import React, { useState ,useEffect} from 'react';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
const Commentsedit = (props) => {
   const [commentList, setcommentList] = useState([]);
   const { search } = useLocation();
  const queryParams = new URLSearchParams(search);
  const commentId = queryParams.get('commentId');

    const [newcw, setnewcw] = useState({

        word:"",
        commentId:commentId
      })

      const handleChange = e => {
        setnewcw({ ...newcw, [e.target.id]: e.target.value });
      };
      var token=localStorage.getItem("auth_token");
      const handleclick = async (event) => {
        console.log(newcw)
        const a = await fetch('http://localhost:1234/api/editcomment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(newcw)
            })
            const res = await a.json()
            alert(res.status)
      };
    return(
        
        <>
        <h1>Edit for Comments {commentId}</h1>
          {localStorage.getItem("auth_token")?(
            <>
            <TextField label="new word" variant='outlined' color='secondary' id="word"  value={newcw.word} onChange={handleChange}/>
            <p></p>
            <button id="edit"  onClick={handleclick}>edit</button>
            </>
          ):(
            <>
            <h1>no allowed to edit comment without login</h1>

            </>
          )}
        </>
           

    );
};
export default Commentsedit;