import React from 'react';
import axios from 'axios';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';


// Base URL below
const BASE_URL = 'http://localhost:3000';

export default function CreateBlog(props) {
    const currentUser = props.user;
    // console.log(currentUser)
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const navigatePush = useNavigate();


    // Author current undefined 
    // Img url still not set
            //  The image post below needs to be read from the JPG saved file automatically or manually
            // "author": props.currentUser,
            // Removed input to place Author instead carried across as prop currentUser

    
    const handleSubmit = (ev) => {
        console.log('form submitted');
        
        ev.preventDefault()
        
        axios.post(`${BASE_URL}/blogs`, {
            "title": title,
            "author": currentUser,
            "content": content,
            "img": cloudinaryImage,
        })
        .then(res => {
            console.log(`we've made it to then`)
            console.log('response', res)
            navigatePush('/paint')
        })
        .catch(err => { 
            console.error(`error submitting data:`, err)
        })
        
    }


    const handleInput = (ev) => {
        switch (ev.target.name){
            case 'title':
                setTitle(ev.target.value)
                // console.log(title);
                break
            // case 'image':
                
            //     // console.log(img);
            //     break
            case 'content':
                setContent(ev.target.value)
                // console.log(content);
                break
            default:
                console.log('Please try again')
        }

    }

    // TODO : The image we paint, needs to be saved as a file, not a name which then gets posted to the backend...  


    //  Step 1: Download canvas into an image -  complete


    //  Step 3: Use URL as img Value i.e. setImg(ev.target.value)
    //  Step 4: Get handleSumbit and Post to backend
    //  bvbkk3iesl0epuwafypr

    // cloudinary1
    // upload image locally 
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
            console.log(data.secure_url);
          }
        } catch (error) {
          console.log(error);
        }
      };

    

    return (

          <div className="createBlog">
            <h2>Create Blog Post</h2>
            <form className="postblogform" onSubmit={handleSubmit} >

                <div>
                    <label>
                        Title
                        <input className="postbloginput" onChange={handleInput}
                        name="title"
                        type="text"
                        required
                        placeholder='PaintBlog title'
                        />
                    </label>
                </div>
        
                <div>
                    <label>
                        Description
                        <input className="postBlogContent" onChange={handleInput}
                        name="content"
                        type="text"
                        placeholder='Your blog goes here'
                        />
                    </label>
                </div>
                <div>
                    <input type="file" onChange={(e) => {uploadImage(e.target.files)}}></input>
                </div>
                <section className="right-side">
                </section>
                <div className="postblogbutton">
                <button >Post blog</button>
                </div>
            </form>
          </div>

       );
}