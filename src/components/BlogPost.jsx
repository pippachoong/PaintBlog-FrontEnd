import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import Card from 'react-bootstrap/Card'
import Stack from 'react-bootstrap/Stack'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Spinner from 'react-bootstrap/Spinner'
import Button from 'react-bootstrap/Button'
import CreateComment from './CreateComment'

let BASE_URL = 'http://localhost:3000';

export default function BlogPost(props) {

    const currentUser = props.user;
    console.log('current user', currentUser)

    const { id } = useParams();
    let array;
    const [loading, setLoading] = useState(false);
    const [blogPost, setBlogPost] = useState({});
    const [error, setError] = useState(null);
    const [like, setLike] = useState('Like');
    const [likesCount, setLikesCount] = useState(0);
    

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/blogs/${id}`)
            .then(
                res => {
                    setBlogPost(res.data);
                    console.log(blogPost)
                    setLoading(false);
                    setLikesCount(res.data.like);

                    // const existsInLikeArray = likeArray.filter((id) => id.toString() === userId.toString());

                }

            )
            .catch(err => {
                console.warn(`Error`, err);
                setLoading(false);
            })
    }, [])

    async function handleLike(ev){
        ev.preventDefault()

        await axios.post(`${BASE_URL}/blogs/${id}/like`, {
            test: true, 
        })
        .then(
            res => {

                // window.location.reload(false)
                setLikesCount(res.data)
                console.log('object is:', res.data);
                console.log('length is:', res.data.length);
                // setLike(true),
            }
        )
        .catch(err => {
            console.warn(`Error`, err);
        })

    }

    

    // console.log(`blogPost is: `, blogPost);
    // console.log('blogPost comment',blogPost.comment)

    // console.log('blogPost authors name', blogPost.author.name);

    return (

        <div>
            {
                loading
                    ?
                    (
                        <Spinner animation="border" role="status"> 
                            <span className="visually-hidden" >
                                Loading Blog ... 
                            </span >
                        </Spinner>
                    )
                    :
                    (
                        <>
                            
                            {
                                blogPost.author === undefined
                                    ?
                                    (
                                        <h3>Hello mystery user!</h3>
                                    )
                                    :
                                    (
                                        <Container>
                                            <Row className= "justify-content-md-center">
                                            <Card className="card" style={{width: '60%'}}>
                                            <Card.Img id='blog-post img' src={blogPost.img}/>
                                                <Card.Body>
                                                    {/* {'Likes  ' + likesCount} */}
                                                    <Card.Title>
                                                        {blogPost.title}    
                                                    </Card.Title>    
                                                    <Card.Subtitle>
                                                        {blogPost.author.name} - <em>{moment(blogPost.createdAt).format('DD MMM YY, HH:mm:ss')}</em>
                                                    </Card.Subtitle>
                                                    <Card.Text>
                                                    {blogPost.content}
                                                    </Card.Text>
                                                    <Button variant="success" size="sm" onClick={handleLike}>
                                                        {likesCount.includes(currentUser._id) ? `UnLike ${likesCount.length}` : `Like ${likesCount.length}`}
                                                    </Button>
                                                </Card.Body>
                                            </Card>
                                            <ListGroup>
                                            
                                            <ListGroup>
                                                <h3>Comments ({blogPost.comment.length})</h3>
                                            </ListGroup>
                                                
                                                {
                                                    blogPost.comment === undefined
                                                        ?
                                                        (
                                                            <ListGroup.Item>
                                                                No comments yet.
                                                            </ListGroup.Item>
                                                        )
                                                        :
                                                        (
                                                            <div>
                                                                
                                                                <ul>
                                                                    {
                                                                                                            blogPost.comment.map(comment => (
                                                                                                                <ListGroup.Item>
                                                                                                                    {comment.text} 
                                                                                                                    <em>- {comment.author.name}</em>
                                                                                                                </ListGroup.Item>
                                                                        ))
                                                                    }
                                                                </ul>
                                                            </div>
                                                        )
                                                }
                                            </ListGroup>
                                            </Row>
                                        </Container>
                                    )
                            }
                            
                        </>
                    )
            }
            <CreateComment blogId={id}/>
        </div >
    );
}