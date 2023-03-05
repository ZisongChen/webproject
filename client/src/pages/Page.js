import React, { useState ,useEffect} from 'react';
import { TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import hljs from "highlight.js";
import "highlight.js/styles/vs2015.css";
import ReactPaginate from 'react-paginate';
import './pagess.css'
import { Container, Button } from '@mui/material';
const Page = () => {
  const [postList, setPostList] = useState([]);
  var postId;
  const [currentPage, setCurrentPage] = useState(0);
  const postsPerPage = 10;
  const [updateComments, setUpdateComments] = useState(0);
  useEffect(() => {
    fetch("http://localhost:1234/api/posts",{
      method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
    })
      .then(response => response.json())
      .then(data => setPostList(data.list))
      .catch(error => console.log(error));

  },[updateComments]);
    hljs.highlightAll()
    const [post, setpost] = useState({
        title:"",
        word:"",
        language:""
      })

      const handleChange = e => {
        setpost({ ...post, [e.target.id]: e.target.value });
      };
      var token=localStorage.getItem("auth_token");
      const handleclick = async (event) => {


        event.preventDefault(); 
        const aaa = await fetch('http://localhost:1234/api/private', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(post)
            })
            setUpdateComments(updateComments + 1);
            const res = await aaa.json()
            

      };
      const handleDelete = async (key) => {
        var postid={"id":key}
        var token=localStorage.getItem("auth_token");
        console.log(postid);
        const aa = await fetch('http://localhost:1234/api/deletepc', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token,
            },
            body: JSON.stringify(postid)
            })

        // const aaa = await fetch('http://localhost:1234/api/deletep', {
        //     method: 'POST',
        //     headers: {
        //         "Content-Type": "application/json",
        //         "Authorization": "Bearer " + token,
        //     },
        //     body: JSON.stringify(postid)
        //     })
            const res = await aa.json();
            setUpdateComments(updateComments + 1);
            setUpdateComments(updateComments + 1);
            alert(res.msg)
      }

    return(

        <>
      <Container><h1>Posts</h1></Container>
      {postList.slice(currentPage * postsPerPage, (currentPage + 1) * postsPerPage).map((item) => {
      const key = item._id

 
  return (
    <Container>
    <div key={key}>
      <h2>Title:{item.title}</h2>
      <pre>
        <code className={"language-"+item.language+""}>{item.post}</code></pre>
      <p>by {item.email}</p>

      <p>last modified:{item.time}</p>
      <Button component={Link} to={{ pathname: '/comments', search: `?postId=${key}` }}>View Comments</Button>
      <Button component={Link} to={{ pathname: '/edit', search: `?postId=${key}` }}>Edit Post</Button>
      <Button onClick={()=>handleDelete(key)}>Delete</Button>
    </div>
    </Container>

  );
})}
          <Container><><ReactPaginate
              pageCount={Math.ceil(postList.length / postsPerPage)}
              onPageChange={({ selected }) => setCurrentPage(selected)}
              containerClassName={'pagination'}
              activeClassName={'active'}
              previousLabel={<span className="prev">Previous</span>}
              nextLabel={<span className="next" >Next</span>}
              
            />
            </>
            </Container>
          {localStorage.getItem("auth_token")?(
            <Container>
            <>
            <TextField label="title" variant='outlined' color='secondary' id="title"  value={post.title} onChange={handleChange}/>
            <p></p>
            
            <TextField id="word" label="code" variant='outlined' color='secondary' value={post.word} onChange={handleChange}/>
            <p></p>
            <label>Language:</label>
            <div>
            <select id="language" value={post.language} onChange={(e) => setpost({ ...post, language: e.target.value })}>
              <option value="">-select-</option>
              <option value="javascript">javascript</option>
              <option value="python">python</option>
              <option value="java">java</option>
              
            </select>
          </div>

            
            <button id="post"  onClick={handleclick}>post</button>
            </>
            </Container>
          ):(
            <Container>
            <>
            <h1>no allowed to post your code without login</h1>

            </>
            </Container>
          )}
       
           </>

    );
};
export default Page;