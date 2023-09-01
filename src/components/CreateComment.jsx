import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams, Routes, Route } from 'react-router-dom'; // Import Routes and Route

let BASE_URL = 'http://localhost:3000';

export default function CreateComment(props) {
    const [blogPostId, setBlogPostId] = useState('');
    const [comment, setComment] = useState('');
    const [loading, setLoading] = useState(false);
    const [comments, setComments] = useState([]);
    const blogId = props.blogId;

    // const navigate = useNavigate(); // Rename navigatePush to navigate

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/blogs/${blogId}`)
            .then(res => {
                setComments(res.data.comments);
                setBlogPostId(res.data._id);
                setLoading(false);
            })
            .catch(err => {
                console.warn('Error fetching comments:', err);
                setLoading(false);
            });
    }, [blogId]);

    function handleInput(ev) {
        switch (ev.target.name) {
            case 'comment':
                setComment(ev.target.value);
                break;
            default:
                console.log('Comment failed');
        }
    }

    const handleSubmit = (ev) => {
        ev.preventDefault();

        axios.post(`${BASE_URL}/blogs/${blogPostId}/comment`, {
                comment: comment,
            })
            .then(res => {
                console.log('Comment submission response:', res.data);
                window.location.reload(true);  // TODO: This is a bug that needs to be fixed.
                // Navigate push below is required.
                // navigate(`/blogs/${blogPostId}`); // Use navigate instead of navigatePush
            })
            .catch(err => {
                console.error('error submitting data: ', err);
            });
    }

    return (
        <div>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>
                        Comment
                    </Form.Label>
                    <Form.Control
                        as="textarea"
                        placeholder='Enter comment'
                        name="comment"
                        onChange={handleInput}
                        type="name"
                        rows={3}
                        value={comment}
                    />
                </Form.Group>
                <Button
                    variant='dark'
                    type='submit'>
                    Submit
                </Button>
            </Form>
        </div>
    );
}
