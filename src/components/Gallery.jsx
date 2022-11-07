import React from "react";
import axios from "axios";
import { useState, useEffect } from 'react';

let BASE_URL = 'http://localhost:3000';

function Gallery() {

    const [blogPosts, setBlogPosts] = useState([]);
    const [loading, setLoading] = useState(false);

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
            })
    }, [])

    console.log(`blogPosts is`, blogPosts);

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
                            <div key={blog._id}>
                                <p>
                                    {blog.content}
                                </p>
                            </div>
                        )}
                        </div>
                    )
            }
        </div>
    );
}

export default Gallery;