import React, { useState ,useEffect} from 'react';
import { TextField } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';
import { Container } from '@mui/system';
import "highlight.js/styles/vs2015.css";
import hljs from "highlight.js";
const Search = () => {
    const [search, setSearch] = useState({
      word: ""
    });
    useEffect(() => {
        hljs.highlightAll(); 
    })
    const [postList, setPostList] = useState([]);
    const handleChange = (e) => {
      setSearch({ ...search, [e.target.id]: e.target.value });
    };
    const handleClick = async (event) => {
      const response = await fetch("http://localhost:1234/api/search", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(search)
      });
      const data = await response.json();
      
      setPostList(data.results);
      // update the postList state with the search results
    };
    return (
      <Container>
        <TextField
          label="search"
          variant="outlined"
          color="secondary"
          id="word"
          value={search.word}
          onChange={handleChange}
        />
        <p></p>
        <Button variant="contained" onClick={handleClick}>
          Search
        </Button>
        {/* Display the search results */}
        {postList.map((item) => (
          <div key={item._id}>
          <h2>Title:{item.title}</h2>
          <pre>
            <code className={"language-"+item.language+""}>{item.post}</code></pre>
          <p>by {item.email}</p>
          
          <p>last modified:{item.time}</p>
          <Button component={Link} to={{ pathname: '/comments', search: `?postId=${item._id}` }}>View Comments</Button>
          <Button component={Link} to={{ pathname: '/edit', search: `?postId=${item._id}` }}>Edit Post</Button>
          </div>
        ))}
      </Container>
    );
  };
  export default Search;