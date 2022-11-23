import react from 'react';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

let BASE_URL = 'http://localhost:3000';

export default function BlogPost(props) {

    const { id } = useParams();

    const [loading, setLoading] = useState(false);
    const [blogPost, setBlogPost] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/blogs/${id}`)
            .then(
                res => {
                    setBlogPost(res.data);
                    // console.log(res.data)
                    setLoading(false);
                },

            )
            .catch(err => {
                console.warn(`Error`, err);
                setLoading(false);
            })
    }, [])

    // console.log(`blogPost is: `, blogPost);
    // console.log('blogPost comment',blogPost.comment)

    // console.log('blogPost authors name', blogPost.author.name);

    return (

        <div>
            {
                loading
                    ?
                    (<div> Loading Blog ... </div>)
                    :
                    (
                        <>
                            <h2>{blogPost.title}</h2>
                            {
                                blogPost.author === undefined
                                    ?
                                    (
                                        <h3>Hello mystery user!</h3>
                                    )
                                    :
                                    (
                                        <h3>{blogPost.author.name} - <em>{moment(blogPost.createdAt).format('DD MMM YY, HH:mm:ss')}</em></h3>
                                    )
                            }

                            <img src={blogPost.img} alt="" />
                            <p>{blogPost.content}</p>
                            {
                                blogPost.comment === undefined
                                    ?
                                    (
                                        <div>No Comments</div>
                                    )
                                    :
                                    (
                                        <div>
                                            <h3>Comments ({blogPost.comment.length})</h3>
                                            <ul>
                                                {
                                                    blogPost.comment.map(comment => (
                                                        <li>{comment.text}</li>
                                                    ))
                                                }
                                            </ul>
                                        </div>
                                    )
                            }
                        </>
                    )
            }
        </div >
    );
}