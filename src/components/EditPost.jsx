// This component will be a page for the user to edit a post
// TODO: edit details like name, title, author, body text of the blog post
// TODO: replace / reupload a new image for this blog post
// TODO: Download function for current image
// TODO: FIX the comments posting
// TODO: FIX the like and Unlike function

import Recat from 'react';
import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {CloudinaryImage} from '@cloudinary/url-gen';

const BASE_URL = 'http://localhost:3000';


export default function EditPost(props) {
    const currentUser = props.user;
    const { id } = useParams();
    const [blogPost, setBlogPost] = useState({});
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');
    const [cloudinaryImage, setCloudinaryImage] = useState('');
    const navigatePush = useNavigate();

    useEffect(() => {
        axios.get(`${BASE_URL}/blogs/${id}`)
            .then(res => {
                setBlogPost(res.data);
                setTitle(res.data.title);
                setContent(res.data.content);
                setImg(res.data.img);
            })
            .catch(err => {
                console.warn('Error fetching blog post:', err);
            });
    }, [id]);

    // Update title, content, and image input values
    function handleInput(ev) {
        const { name, value } = ev.target;
        if (name === 'title') {
            setTitle(value);
        } else if (name === 'content') {
            setContent(value);
        } else if (name === 'img'){
            setImg(value);
        }
    }

    // Handle image upload and set the image URL
    async function uploadImage(files) {
        // ... (upload image logic, setImg)
        console.log(files[0]);
        const formData = new FormData();
        formData.append("file", files[0]);
        formData.append("upload_preset", "paintblog_upload");
      
        try {
          const response = await fetch(
            "https://api.cloudinary.com/v1_1/du7c4cskj/image/upload",
            {
              method: "POST",
              body: formData,
            }
          );
          const data = await response.json();
          setImg(data.secure_url);
          console.log('img 3 :', img);
          console.log(data);
          if (data && data.secure_url) {
            setCloudinaryImage(data.secure_url);
            setImg(data.secure_url);
            // handleInput();
            console.log('cloudinary im: ', cloudinaryImage)
            console.log('new img 2: ', img);
          }
        } catch (error) {
          console.log(error);
        }
    }

    // Handle form submission
    async function handleSubmit(ev) {
        ev.preventDefault();

        try {
            const response = await axios.post(`${BASE_URL}/blogs/${blogPost._id}/edit`, {
                title: title,
                content: content,
                img: img, // You can modify this to use the new image URL if needed
            });


            if (response.data === 'ok') {
                navigatePush(`/blogs/${blogPost._id}`);
                console.log('new img 1: ', img);
            } else {
                console.error('Error updating blog post:', response.data);
            }
        } catch (err) {
            console.error('Error:', err);
        }
    }

    return (

        <div>
        {currentUser && blogPost.author && currentUser._id === blogPost.author._id ? (
            <div className="editBlog">
                {/* Rest of the form */}
                <form onSubmit={handleSubmit}>
                <div>
                    <label>
                        Title
                        <input
                            name="title"
                            type="text"
                            required
                            onChange={handleInput}
                            value={title} // Use 'value' instead of 'defaultValue'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Content
                        <textarea
                            name="content"
                            onChange={handleInput}
                            value={content} // Use 'value' instead of 'defaultValue'
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Image
                        <input
                            name="img"
                            type="file"
                            onChange={(e) => uploadImage(e.target.files)}
                        />
                        {/* Display the uploaded image */}
                        {cloudinaryImage !== '' ? (
                            <img src={cloudinaryImage} alt="Uploaded" />
                        ) : (
                            <img src={blogPost.img} alt="Original image" />
                        )}
                    </label>
                </div>
                <div>
                    <button>Update Blog</button>
                </div>
                </form>
            </div>
        ) : (
            <div>Access Denied, Please return to the home screen</div>
        )}
    </div>  
    );
}


