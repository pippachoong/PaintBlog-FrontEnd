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
import { Nav} from 'react-bootstrap';
// import { useNavigate, useParams } from 'react-router-dom';

let BASE_URL = 'http://localhost:3000';
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://paint-blog-backend.vercel.app/';
} // end rails deployment if-else

export default function BlogPost(props) {

    const currentUser = props.user;
    const navigatePush = useNavigate();
    const { id } = useParams();
    let array;
    const [loading, setLoading] = useState(false);
    const [blogPost, setBlogPost] = useState({});
    const [error, setError] = useState(null);
    const [like, setLike] = useState('');
    const [likesCount, setLikesCount] = useState(0);
    // Add a state variable to track the number of comments to display
    const [readMoreComments, setReadMoreComments] = useState(false);
    const [numCommentsToShow, setNumCommentsToShow] = useState(3);
    

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/blogs/${id}`)
            .then(
                res => {
                    setBlogPost(res.data);
                    setLike(res.data.like);
                    console.log('likes :', res.data.like)
                    setLoading(false);
                    setLikesCount(res.data.like);
                    
                    // const existsInLikeArray = likeArray.filter((id) => id.toString() === userId.toString());
            })
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

    // need to add condition to check if current user
    function handleEditBlog(id, e) {
        // prevent logged out users from seeing the blog show page
        if(props.user !== null){
            navigatePush(`/blogs/${id}/edit`);
        }
    }

    function handleDeleteBlog(id, e) {
        // prevent logged out users from seeing the blog show page
        if (props.user !== null) {
            const confirmed = window.confirm('Are you sure you want to delete this blog post?');
            if (confirmed) {
                axios.delete(`${BASE_URL}/blogs/${id}/delete`)
                    .then(() => {
                        navigatePush('/');
                    })
                    .catch(err => {
                        console.warn('Error deleting blog post:', err);
                    });
            }
        }
    }

    // Function to show more comments when the "Read More" link is clicked
    const handleReadMoreComments = () => {
    setNumCommentsToShow(blogPost.comment.length);
    setReadMoreComments(true);
    };

    const handleReadLessComments = () => {
        setNumCommentsToShow(3);
        setReadMoreComments(false);
    }

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
                                            {/* <Link href={}></Link> */}

                                            {
                                                blogPost.author._id === currentUser._id
                                                ?
                                                (
                                                    <><div id='edit-post' onClick={(e) => handleEditBlog(blogPost._id, e)}> Edit</div><div id='delete-post' onClick={(e) => handleDeleteBlog(blogPost._id, e)}> Delete </div></>
                                                )
                                                :
                                                (
                                                    <div> 

                                                    </div>
                                                )
                                            }
                                           


                                            <Row className= "justify-content-md-center">
                                            <Card className="card-post">

                                        {/* need to ass link here */}
                                            <Card.Img className='card-img' id='blog-post img' src={blogPost.img} />
                                                <Card.Body className='body-post'>
                                                    {/* {'Likes  ' + likesCount} */}
                                                    <Card.Title>
                                                        {blogPost.title}    
                                                    </Card.Title>    
                                                    <Card.Subtitle>
                                                        {blogPost.author.name} - <em>{moment(blogPost.createdAt).format('DD MMM3YY, HH:mm:ss')}</em>
                                                    </Card.Subtitle>
                                                    <Card.Text>
                                                    {blogPost.content}
                                                    </Card.Text>
                                                    <button  onClick={handleLike}>
                                                        {likesCount.includes(currentUser._id) ? `UnLike ${likesCount.length}` : `Like ${likesCount.length}`}
                                                    </button>
                                                    
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
                                                                                                                                                                                    blogPost.comment.slice
                                                                                                                                                                                    (0, numCommentsToShow).map(
                                                                                                                                                                                        (comment, index)  => {
                                                                                                                                                                                        return (
                                                                                                                                                                                            <ListGroup.Item>
                                                                                                                                                                                                {comment.text}
                                                                                                                                                                                                <em>- {comment.author.name}</em>
                                                                                                                                                                                            </ListGroup.Item>
                                                                                                                                                                  )})

                                                                   }
                                                                </ul>
                                                    {
                                                        readMoreComments === false

                                                        ?
                                                        (
                                                            blogPost.comment.length > 3 && (
                                                                <div
                                                                id="read-more-comments"
                                                                onClick={handleReadMoreComments}
                                                                >
                                                                Read More Comments ({blogPost.comment.length - numCommentsToShow} more)
                                                                </div>
                                                            )
                                                        )
                                                        :
                                                        (
                                                            blogPost.comment.length > 3 && (
                                                                <div
                                                                id="read-more-comments"
                                                                onClick={handleReadLessComments}
                                                                >
                                                                Read Less Comments (3 Comments)
                                                                </div>
                                                            )
                                                        )

                                                    }
                                                  
                                                 </div>
                                                        )
                                                }
                                                    <CreateComment blogId={id}/>
                                            </ListGroup>
                                            </Row>
                                        </Container>
                                    )
                            }
                            
                        </>
                    )
            }
           
        </div >
    );
}