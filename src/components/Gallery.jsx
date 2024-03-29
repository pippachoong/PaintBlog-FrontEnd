import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

let BASE_URL = 'http://localhost:3000';
if( process.env.NODE_ENV === 'development'){
    BASE_URL = 'http://localhost:3000';
} else {
    BASE_URL = 'https://paint-blog-backend.vercel.app/';
} // end rails deployment if-else

export default function Gallery(props) {

    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigatePush = useNavigate();

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/blogs`)
            .then(
                res => {
                    console.log('res.data is:', res.data);
                    setBlogPosts(res.data);
                    setLoading(false);
                }
            )
            .catch(err => {
                console.warn(`Error`, err);
                setLoading(false);
            })
    }, [])

    console.log(`blogPosts is`, blogPosts);

    function handleShowBlog(id, e) {
        // prevent logged out users from seeing the blog show page
        if(props.user !== null){
            navigatePush(`/blogs/${id}`);
        }
    }

    return (
        <div>
            {
                loading === true
                    ?
                    (<div>Loading...</div>)
                    :
                    (
                        <div id='blog-posts'>
                        {
                        blogPosts.map((blog) =>
                           
                          <div id='outer-post' onClick={(e) => handleShowBlog(blog._id, e)}>
                            <div id='post' key={blog._id}>
                                <h3 id='blog-title'>
                                    {blog.title} 
                                </h3>
                                <h4 id='blog-info'>
                                    {blog.author.name} - {moment(blog.createdAt).format('Do MMMM YYYY,h:mm:ss a')}
                                </h4>
                                <p id='blog-content'>
                                    {blog.content}
                                </p>
                                <img id='blog-img' src={blog.img}/>
                            </div>
                          </div>
                        )}
                        </div>
                    )
            }
        </div>
    );
}

// export default Gallery;