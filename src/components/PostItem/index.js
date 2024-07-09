import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaThumbsUp, FaThumbsDown, FaEdit, FaTrash } from 'react-icons/fa';
import ConfirmationModal from '../ConfirmationModal';
import './PostItem.css'; 

const PostItem = ({ post }) => {
    const [showModal, setShowModal] = useState(false);
    const [likes, setLikes] = useState(post.likes);
    const [dislikes, setDislikes] = useState(post.dislikes);
    const navigate = useNavigate();

    const handleEdit = () => {
        navigate(`/edit-post/${post._id}`);
    };

    const handleDelete = async () => {
        try {
            await axios.delete(`https://wylo-company-backend.onrender.com/posts/${post._id}`);
            setShowModal(false);
            window.location.reload(); 
        } catch (err) {
            console.error('Error deleting post:', err.response ? err.response.data : err.message);
            alert('Error deleting post. Check console for details.');
        }
    };

    const handleLike = async () => {
        try {
            const response = await axios.put(`https://wylo-company-backend.onrender.com/posts/${post._id}/like`);
            setLikes(response.data.likes);
        } catch (err) {
            console.error('Error liking post:', err.response ? err.response.data : err.message);
            alert('Error liking post. Check console for details.');
        }
    };

    const handleDislike = async () => {
        try {
            const response = await axios.put(`https://wylo-company-backend.onrender.com/posts/${post._id}/dislike`);
            setDislikes(response.data.dislikes);
        } catch (err) {
            console.error('Error disliking post:', err.response ? err.response.data : err.message);
            alert('Error disliking post. Check console for details.');
        }
    };

    const formatDateToIST = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
    };

    return (
        <div className="post-item">
            <div className="post-header">
                <div className='posttext'>
                    <div>
                        <h2>{post.title}</h2>
                        <p>{post.content}</p>
                    </div>
                    <button className="edit" onClick={handleEdit}><FaEdit /> Edit</button>
                </div>
                <img src={`https://wylo-company-backend.onrender.com${post.imageUrl}`} alt="Post" />
            </div>
            <div className="post-dates">
                {/* <p>Created At: {formatDateToIST(post.createdAt)}</p> */}
                <p>{formatDateToIST(post.updatedAt)}</p>
            </div>
            <div className="post-actions">
                <div className='likeANDdis'>
                    <button className="like" onClick={handleLike}><FaThumbsUp /> {likes}</button>
                    <button className="dislike" onClick={handleDislike}><FaThumbsDown /> {dislikes}</button>
                </div>
                <button className="delete" onClick={() => setShowModal(true)}><FaTrash /> Delete</button>
            </div>
            <div className="post-comments">
            </div>
            <ConfirmationModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleDelete}
            />
        </div>
    );
};

export default PostItem;
