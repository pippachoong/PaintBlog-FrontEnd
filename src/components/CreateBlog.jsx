import React from 'react';
import axios from 'axios';
import p5 from 'p5';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';


// Base URL below
const BASE_URL = 'http://localhost:3000';

export default function CreateBlog(props) {
    
    const [title, setTitle] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');
    const [cloudinaryImage, setCloudinaryImage] = useState("")
    const navigatePush = useNavigate();


    
    const handleSubmit = (ev) => {
        console.log('form submitted');
        
        ev.preventDefault()
        
        axios.post(`${BASE_URL}/blogs`, {
            "title": title,
            // Removed input to place Author instead carried across as prop currentUser
            "author": props.currentUser,
            //  The image post below needs to be read from the JPG saved file automatically or manually
            "img": img,
            "content": content
        })
        .then(res => {
            console.log(`we've made it to then`)
            console.log('response', res)
            navigatePush('/')
        })
        .catch(err => { 
            console.error(`error submitting data:`, err)
        })
        
    }

    //  Code not used here
    // const saveImageToLocal = (e) =>{
    //     let link = e.currentTarget;
    //     link.setAttribute('download', 'canvas.jpg');
    //     let image = p5.canvasRef.current.toDataURL('image/jpg');
    //     link.setAttribute('href', image);

    // }

    const handleInput = (ev) => {
        switch (ev.target.name){
            case 'title':
                setTitle(ev.target.value)
                break
            // case 'author':
            //     setAuthor(currentUser)
            //     break
            case 'image':
                setImg(ev.target.value)
                break
            case 'content':
                setContent(ev.target.value)
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
                        Blog
                        <input className="postbloginput" onChange={handleInput}
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
                <h3>The resulting image will be displayed here</h3>
                {cloudinaryImage && <img src={cloudinaryImage} alt="Uploaded" />}
                </section>
                <div className="postblogbutton">
                <button >Save blog</button>
                </div>
            </form>
          </div>

       );
}