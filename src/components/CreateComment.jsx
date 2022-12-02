import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

let BASE_URL = 'http://localhost:3000';


export default function CreateComment (props) {

    const [blogId, setBlogId] = useState(props.blogId);
    const [comment, setComment] = useState('');
    const navigatePush = useNavigate();

    // console.log(blogId)

    // const {blogId} = use();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    function handleInput(ev){
        switch(ev.target.name){
            case 'comment':
            setComment(ev.target.value)
            break;
            default: console.log('Comment failed')
        }
     
    }

    // const exitForm = () => {


    // };

    async function handleSubmit(ev){
        ev.preventDefault();

        await axios.post(`${BASE_URL}/blogs/${blogId}/comment`, {
            // ...comment, 
            // blodId: __id,
            comment: comment,

        })
        .then( res => {
            // exitForm();
            window.location.reload(false)
            // console.log(
            //     `/blogs/${blogId}`
            // )
            // navigatePush(`/blogs/${blogId}`);

        })
        .catch( err => {
            console.error('Error submitting comment', err)
        })
    }

    useEffect( () => {
        setLoading(true);
        // axios.post(`${B}`)
    })

    return (
        <div>
            <h1>COMMENT GOES HERE!!!!!!!!!!!!!</h1>
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
                    />
                </Form.Group>
                <Button 
                variant='dark' 
                type='submit'>
                Submit</Button>  
            </Form>
        </div>
    )

}