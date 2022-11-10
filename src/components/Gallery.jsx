import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

let BASE_URL = 'http://localhost:3000';

export default function Gallery() {

    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigatePush = useNavigate();

    // TODO: import the data from the backend
    // e.g. http://localhost:3000/blogs

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/blogs`)
            .then(
                res => {
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
        navigatePush(`/blogpost/${id}`);
    }

    return (
        <div>
            {
                loading === true
                    ?
                    (<div>Loading...</div>)
                    :
                    (
                        <div>
                        {
                        blogPosts.map((blog) =>
                           
                          <div onClick={(e) => handleShowBlog(blog._id, e)}>
                            <div key={blog._id}>
                                <h3>
                                    {blog.title} 
                                </h3>
                                <h4>
                                    {blog.author} - {moment(blog.createdAt).format('Do MMMM YYYY,h:mm:ss a')}
                                </h4>
                                <p>
                                    {blog.content}
                                </p>
                                <img src={blog.img}/>
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