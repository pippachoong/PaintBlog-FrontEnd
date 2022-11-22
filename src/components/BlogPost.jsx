import react from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';

let BASE_URL = 'http://localhost:3000';

export default function BlogPost (props){

    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [blogPost, setBlogPost] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/blogs/${id}`)
            .then(
                res => {
                    setBlogPost(res.data);
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

    console.log('blogPost 1', blogPost);

    return(

        <div>
            {
                loading
                ?
                (<div> Loading Blog ... </div>)
                :
                (
                <>  

                {
                    // blogPost.map((r) => 
                    // <div>
                    // <p>{r.title}</p>
                    // {/* <p>{r.author.name}</p> */}
                    // <img src={r.img}></img>
                    // <p>{r.content}</p>
                    // </div>
                    // )
                }
                {/* <h2>{blogPost.title}</h2> */}
                
                {/* <h3> */}
                    {/* {blogPost.author.map((r) => 
                    <div>{r.name}</div>
                    )} -  */}
                    {/* {moment(blogPost.createdAt).format('Do MMMM YYYY,h:mm:ss a')} </h3> */}
                {/* <img src={blogPost.img} alt="" />
                <p>{blogPost.content}</p> */}
                {/* <div>
                {   
                    // console.log('blogpost', blogPost)
                    // console.log('blogpost', blogPost.comment)
                    blogPost.comment === undefined
                    ? 
                    (
                        <div></div>
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

                </div> */}
                </>  
                ) 
            }
        </div>

    );



}

// export default BlogPost;