import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PostItem from '../PostItem';
import CreatePost from '../CreatePost';
import { useNavigate } from 'react-router-dom';
import './PostsDisplay.css'; 

const PostsDisplay = () => {
    const [posts, setPosts] = useState([]);
    const [showCreatePost, setShowCreatePost] = useState(false); 
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('https://wylo-company-backend.onrender.com/posts');
                setPosts(response.data);
            } catch (err) {
                console.error('Error fetching posts:', err.response ? err.response.data : err.message);
                alert('Error fetching posts. Check console for details.');
            }
        };
        fetchPosts();
    }, []);

    const handleCreatePost = () => {
        setShowCreatePost(true);
    };

    const handleCloseCreatePost = () => {
        setShowCreatePost(false);
    };

    const handlePostDelete = (postId) => {
        setPosts(posts.filter(post => post._id !== postId));
    };

    return (
        <div className="posts-display">
            <div className="user-profile">
                <img src="https://res.cloudinary.com/drevfgyks/image/upload/v1683714935/People/20210426012321_IMG_7245_2_1_nymbjo.jpg" alt="User Profile" />
                <p>SAI AETTARI</p>
            </div>
            <div className="post-input" onClick={handleCreatePost}>
                <textarea placeholder="Post something here" readOnly></textarea>
            </div>
            {posts.map((post) => (
                <PostItem key={post._id} post={post} onPostDelete={handlePostDelete} />
            ))}
            <button className="create-post-btn" onClick={handleCreatePost}>Create Post</button>

            {showCreatePost && (
                <div className="popup-container">
                    <div className="popup">
                        <CreatePost onClose={handleCloseCreatePost} /> {/* Pass onClose function to close popup */}
                    </div>
                </div>
            )}
        </div>
    );
};

export default PostsDisplay;
