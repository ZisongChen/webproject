import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import Header from './pages/Header';
import Page from './pages/Page'
import Comments from './pages/Comments'
import Edit from './pages/Edit'
import Commentsedit from './pages/Commentsedit'
import Search from './pages/Search'

function App() {
  //you can go to other page by pressing button
  return (
    <Router>
      <Header/>
      <Routes>
      <Route path="/" element={<Page />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Comments" element={<Comments />}/>
        <Route path="/Edit" element={<Edit />}/>
        <Route path="/Commentsedit" element={<Commentsedit />}/>
        <Route path="/Search" element={<Search />}/>

      </Routes>
    </Router>
  );
}

export default App;
