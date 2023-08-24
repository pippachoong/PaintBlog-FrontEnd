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

export default function EditPost(props){
    
    const currentUser = props.user;
    const {id} = useParams();
    console.log(currentUser);
    const [blogPost, setBlogPost] = useState({});
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');
    const [cloudinaryImage, setCloudinaryImage] = useState("");
    const navigatePush = useNavigate();


    // Get Blog Post data 
    useEffect(() => {
        axios.get(`${BASE_URL}/blogs/${id}`)
            .then(
                res => {
                    setBlogPost(res.data);
                }
            )
            .catch(err => {
                console.warn(`Error`, err);
            })
    }, [])

    console.log(blogPost);


    function handleInput(ev){

        switch (ev.target){

            case 'title': setTitle(ev.target.title)
            break;
            case 'img': setImg(ev.target.file)
            break;
            case 'content': setContent(ev.target.content)
        }

       
    };

    const uploadImage = async (files) => {
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
          console.log(data);
          if (data && data.secure_url) {
            setCloudinaryImage(data.secure_url);
            setImg(data.secure_url);
            console.log(data.secure_url);
          }
        } catch (error) {
          console.log(error);
        }
      };

      async function handleSubmit(ev) {
        ev.preventDefault();
    
        try {
            const response = await axios.post(`${BASE_URL}/blogs/${blogPost._id}/edit`, {
                updates: {
                    title: title,
                    content: content,
                    img: img
                }
            });
    
            if (response.data === 'ok') {
                navigatePush(`/blogs/${blogPost._id}`);
            } else {
                console.error('Error updating blog post:', response.data);
            }
        } catch (err) {
            console.error('Error', err);
        }
    }



    return(
        <div className="createBlog">
        <h2>Edit Blog Post</h2>
        <form className="postblogform" onSubmit={handleSubmit}>

            <div>
                <label>
                    Title
                    <input className="postbloginput" onChange={handleInput}
                    name="title"
                    type="text"
                    required
                    defaultValue={blogPost.title}
                    />
                </label>
            </div>
    
            <div>
                <label>
                    Description
                    <input className="postBlogContent" onChange={handleInput}
                    name="content"
                    type="text"
                    defaultValue={blogPost.content}
                    />
                </label>
            </div>
            <div>
                Image
                
                <input type="file" 
                onChange={(e) => {uploadImage(e.target.files)}} 
                defaultValue={blogPost.img}
                ></input>
            </div>
            <section className="right-side">
    
            {
                cloudinaryImage !== ''
                ?
                (
                    <>
                     <img src={cloudinaryImage} alt="Uploaded" />
                     </>
                  
                )
                :
                (
                    <>
                     <img src={blogPost.img} alt="Orginal image" />
                    </>
                )
            }
            
            </section>
            <div className="postblogbutton">
            <button> Update Blog</button>
            </div>
        </form>
      </div>

    )



}