import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';
import moment from 'moment';
import { useNavigate } from "react-router-dom";

let BASE_URL = 'http://localhost:3000';

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
                        <div>
                        {
                        blogPosts.map((blog) =>
                           
                          <div onClick={(e) => handleShowBlog(blog._id, e)}>
                            <div key={blog._id}>
                                <h3>
                                    {blog.title} 
                                </h3>
                                <h4>
                                    {blog.author.name} - {moment(blog.createdAt).format('Do MMMM YYYY,h:mm:ss a')}
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