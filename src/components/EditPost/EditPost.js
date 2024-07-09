import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './EditPost.css'; 
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const { id } = useParams();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://wylo-company-backend.onrender.com/posts/${id}`);
                setTitle(response.data.title);
                setContent(response.data.content);
                setImageUrl(response.data.imageUrl);
            } catch (err) {
                console.error('Error fetching post:', err.response ? err.response.data : err.message);
                alert('Error fetching post. Check console for details.');
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        if (image) formData.append('image', image);
        else formData.append('imageUrl', imageUrl);

        try {
            await axios.put(`https://wylo-company-backend.onrender.com/posts/${id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            navigate('/');
        } catch (err) {
            console.error('Error updating post:', err.response ? err.response.data : err.message);
            alert('Error updating post. Check console for details.');
        }
    };

    return (
        <div className="edit-post">
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
                    {imageUrl && <img src={`https://wylo-company-backend.onrender.com${imageUrl}`} alt="Current" />}
                </div>
                <button type="submit">Update Post</button>
            </form>
        </div>
    );
};

export default EditPost;
