import axios from 'axios';
import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000';

export default function CreateBlog(props) {

    const handleInput = (ev) => {
        console.log('input changing', ev.target.title);
    }

    return (

          <div className="createBlog">
            <h2>Create a Blog!</h2>
            
            <form className="postblogform" onSubmit={handleSubmit} >

                <div>
                <input className="postbloginput" onChange={handleInput}
                name="title"
                type="text"
                required
                placeholder='give your PaintBlog post a title'
                />
                </div>
                <div>
                <input className="postbloginput" onChange={handleInput}
                name="author"
                type="text"
                required
                placeholder='Author'
                />
                </div>
                <div>
                <input className="postbloginput" onChange={handleInput}
                name="image"
                type="text"
                required
                placeholder='Image URL'
                />
                </div>
                <div>
                <input className="postbloginput" onChange={handleInput}
                name="content"
                type="text"
                placeholder='Your blog goes here'
                />
                </div>
                <div className="postblogbutton">
                <button>Save blog</button>
                </div>
            </form>
           

          </div>
        );
}