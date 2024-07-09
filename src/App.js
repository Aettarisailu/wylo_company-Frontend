// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PostsDisplay from './components/PostsDisplay';
import CreatePost from './components/CreatePost';
import EditPost from './components/EditPost/EditPost'
import './App.css'

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<PostsDisplay />} />
                <Route path="/create-post" element={<CreatePost />} />
                <Route path="/edit-post/:id" element={<EditPost />} /> {/* Add the route for EditPost */}
            </Routes>
        </Router>
    );
};

export default App;
