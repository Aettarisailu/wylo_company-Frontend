import React, { useState } from 'react';
import axios from 'axios';
import './CreatePost.css';

const CreatePost = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (title && content) {
            const formData = new FormData();
            formData.append('title', title);
            formData.append('content', content);
            if (image) formData.append('image', image);

            try {
                await axios.post('https://wylo-company-backend.onrender.com/posts', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                onClose();
            } catch (err) {
                console.error('Error creating post:', err.response ? err.response.data : err.message);
                alert('Error creating post. Check console for details.');
            }
        } else {
            alert('Please fill in all fields');
        }
    };

    return (
        <div className="create-post-modal">
            <div className="create-post-form">
                <h2>Create Post</h2>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Title</label>
                        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    <div>
                        <label>Content</label>
                        <textarea value={content} onChange={(e) => setContent(e.target.value)}></textarea>
                    </div>
                    <div>
                        <label>Image</label>
                        <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                    </div>
                    <button type="submit">Post</button>
                </form>
                <button className="close-btn" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default CreatePost;
