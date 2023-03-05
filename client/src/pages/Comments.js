import React, { useState ,useEffect} from 'react';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
const Comments = (props) => {
  const [updateComments, setUpdateComments] = useState(0);
   const [postList, setPostList] = useState([]);
   const { search } = useLocation();
  const queryParams = new URLSearchParams(search);//get the param from last page
  const postId = queryParams.get('postId');
  var id={"postId":postId}
  var ww=0
  useEffect(() => {

    fetch("http://localhost:1234/api/commentlist",{
      method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(id)
    })
      .then(response => response.json())
      .then(data => setPostList(data.list))
      .catch(error => console.log(error));
  },[updateComments]);  //use to show the comments and update page when "updateComments" changes
    const [comments, setcomments] = useState({
        word:"",
        postId:postId
      })

      const handleChange = e => {
        setcomments({ ...comments, [e.target.id]: e.target.value });
      };
      var token=localStorage.getItem("auth_token");//get authentication
      const handleclick = async (event) => {
        console.log(comments)
        const a = await fetch('http://localhost:1234/api/comment', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(comments)
            });
            setUpdateComments(updateComments + 1);//update page

      };
      const handleDelete = async (key) => {
        try {
          var postid={"id":key}
          var token=localStorage.getItem("auth_token");//get authentication
          console.log(postid);
          const aaa = await fetch('http://localhost:1234/api/deletec', {
            method: 'POST',
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(postid)
          });
                  
          const res = await aaa.json();
          setUpdateComments(updateComments + 1);//update page
          alert(res.msg)
        } catch (error) {
          console.log(error);
        }
      }
      
    return(
        
        <>
        <h1>Comments for Post {postId}</h1>
      {postList.map((item) => {
  const key = item._id ? item._id.toString() : null;
 //show all comments for the related post
  return (
    <Container>
    <div key={key}>
      <p>comments:{item.comment}</p>
      <p>by {item.email}</p>
      <p>last modified: {item.time}</p>
      <Button component={Link} to={{ pathname: '/Commentsedit', search: `?commentId=${key}` }}>Edit comment</Button>
      <Button onClick={()=>handleDelete(key)}>Delete</Button>
      
    </div></Container>
  );
})}
          {localStorage.getItem("auth_token")?(//if you login then show following stuff, they are the component to send comments
            <Container>
            <>
            <TextField label="comments" variant='outlined' color='secondary' id="word"  value={comments.word} onChange={handleChange}/>
            <p></p>
            <button id="comments"  onClick={handleclick}>comment</button>
            </>
            </Container>
          ):(//you are not login
            <Container>
            <>
            <h1>no allowed to comment without login</h1>

            </>
            </Container>
          )}
        </>
           

    );
};
export default Comments;
