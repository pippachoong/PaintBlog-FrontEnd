// TODO: this file is the future component - to paint and download images
// TODO: this file is the future component - to paint and download images
import React from 'react';
import axios from 'axios';
import p5 from 'p5';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sketch from 'react-p5';
import CreateBlog from './CreateBlog';
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";




// const cloudinaryConfig = {
//     cloudName: 'du7c4cskj',
//     apiKey: '525852746297563',
// };

// const cloudinaryUrl = `https://api.cloudinary.com/v1_1/du7c4cskj/image/upload`;
// const cloudinaryUploadPreset = 'cloudinary1'; // Optional

// function dataURLtoBlob(dataURL) {
//     const arr = dataURL.split(',');
//     const mime = arr[0].match(/:(.*?);/)[1];
//     const bstr = atob(arr[1]);
//     let n = bstr.length;
//     const u8arr = new Uint8Array(n);
//     while (n--) {
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], { type: mime });
// }

// const uploadToCloudinary = async (imageFile) => {
//     const formData = new FormData();
//     formData.append('file', imageFile);
//     formData.append('upload_preset', cloudinaryUploadPreset);

//     try {
//         const response = await fetch(cloudinaryUrl, {
//             method: 'POST',
//             body: formData,
//         });

//         if (response.ok) {
//             const data = await response.json();
//             const imageUrl = data.secure_url;

            
//             console.log('Image uploaded to Cloudinary:', imageUrl);
//             // setImgUrl(imageUrl);

//             // Passing imgUrl
//             <Paint imgUrl={imageUrl}/>

//             // <CreateBlog imgUrl={imageUrl}/>
//         } else {
//             console.error('Error uploading image to Cloudinary:', response.statusText);
//         }
//     } catch (error) {
//         console.error('Error uploading image to Cloudinary:', error);
//     }
// };

export default function Paint(props) {

    const [imgUrl, setImgUrl] = useState(''); // State to store the imgUrl
    console.log(imgUrl);


    const [imgCloudinaryUrl, setImgCloudinaryUrl] = useState({});
    const [mousePos, setMousePos] = useState({});
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');
    const [brushSize, setBrushSize] = useState(100);

    // SETTING UP COLOR STATE
    const [color, setColor] = useState('red');
    const [colorModes, setColorModes] = useState({
    RGB: p5.RGB,
    HSB: p5.HSB
    });
    const [colorMode, setColorMode] = useState(p5.RGB);
    const [downloadImage, setDownloadImage] = useState('false');
    const [createPost, setCreatePost] = useState('false');

    // array to save circles
    const [circles, setCircles] = useState([]);

    const navigatePush = useNavigate();
   
    const setup = (p5, canvasParentRef) => {

        //TODO: add an image i want to graffiti as the canvas
        const canvas = p5.createCanvas(800, 600).parent(canvasParentRef);
        
        // let color_picker = p5.createColorPicker("green");
        const colorPicker = p5.createColorPicker(color);
        colorPicker.input((c) => {
          setColor(c.hex);
        });

        canvas.mousePressed((event) => {
            console.log('clicked on canvas', event)
        });

        // Save canvas using online syntax
        // p5.saveCanvas(canvas, 'myCanvas', 'jpg');
    }

    const draw = p5 => {
        // background is set to black
        p5.background(0, 0, 0)
        // brush size and shape
        // p5.ellipse(100, 100, 100)
        // fill is the paint brush // FILL DYNAMICALLY CHANGES
        p5.fill(p5.color(color));

        // COLOR MODE SET
        p5.colorMode(colorMode);

        if(p5.keyIsDown(p5.SHIFT)){
            p5.noStroke();
            // noStroke();

            // below function provides the rainbow of colors which need to putelse where to allow users to pick the color for there drawing
           
            // describe(`Rainbow gradient from left to right.
            // Brightness increasing to white at top.`);
            //mouse
            const mouseXNormalised = p5.mouseX / p5.windowWidth;
            const hue = mouseXNormalised * 255

            p5.fill(p5.color(color));

            // TODO: circle follows mouse to show the color and size of the ellipse
            p5.ellipse(
                p5.mouseX, 
                p5.mouseY, 
                100,100 // TODO: make this an input and variable for pen/brush size
            )
            // const arrayCircles = []
            // Add a paint factor for the circles 
            const newCircle = {
                xPos: p5.mouseX,
                yPos: p5.mouseY, 
                size: brushSize, // Pen/brush size
                hue: hue,
                paint: color
            }
            circles.push(newCircle);
            p5.background(0);
            // setCircles(arrayCircles);
            
        }

        // press control to undo last paint strokes
        if(p5.keyIsDown(p5.CONTROL)){
            console.log("control pressed")
            console.log(`circles length is: ${circles.length}`)
            circles.pop();
        }
        
        for (const circle of circles){
            p5.fill( p5.color(circle.paint));

            p5.ellipse(circle.xPos, circle.yPos, circle.size, circle.size)
        }
       // Save image using boolean, change state onClick
        if( downloadImage == 'true' ){
            p5.saveCanvas('myCanvas', 'jpg');
            setDownloadImage('false'); // reset the button
        }

        // Save image using boolean, change state onClick
        if( createPost == 'true' ){
            p5.saveCanvas('myCanvas', 'jpg');
            const canvas = document.querySelector('canvas');
            const imageData = canvas.toDataURL('image/jpeg', 0.8);

            // Call the function with the image file you downloaded
            uploadToCloudinary(dataURLtoBlob(imageData)); 
            console.log('Within Paint url', imageData);
            // Convert data URL to Blob
            setCreatePost('false'); // reset the button
            // Delay the next action by 2 seconds
            setTimeout(() => {
            // Perform the action after the delay
            navigatePush('/create')
            // setMessage('Action completed after 2 seconds.');
            }, 2000); // 2000 milliseconds = 2 seconds

           
        }
    }
    
    const cloudinaryConfig = {
        cloudName: 'du7c4cskj',
        apiKey: '525852746297563',
    };
    
    const cloudinaryUrl = `https://api.cloudinary.com/v1_1/du7c4cskj/image/upload`;
    const cloudinaryUploadPreset = 'cloudinary1'; // Optional
    
    function dataURLtoBlob(dataURL) {
        const arr = dataURL.split(',');
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    }
    
    const uploadToCloudinary = async (imageFile) => {
        const formData = new FormData();
        formData.append('file', imageFile);
        formData.append('upload_preset', cloudinaryUploadPreset);
    
        try {
            const response = await fetch(cloudinaryUrl, {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                const data = await response.json();
                const imageUrl = data.secure_url;
    
                
                console.log('Image uploaded to Cloudinary:', imageUrl);
                // setImgUrl(imageUrl);
    
                // Set imgUrl in state
                setImgUrl(imageUrl);
                console.log('within paint Url', imageUrl)

                // Navigate to the create page after setting imgUrl
                navigatePush('/create');
    
                // <CreateBlog imgUrl={imageUrl}/>
            } else {
                console.error('Error uploading image to Cloudinary:', response.statusText);
            }
        } catch (error) {
            console.error('Error uploading image to Cloudinary:', error);
        }
    };

    return (

        <div className="createArt">
        <h2 className='Paint-label'>Paint!</h2>
        <p> Pick a color, adjust your brush size and Press Down on SHIFT to draw. </p>

        <div className='Paint-instruments'>
            <div className="Paint-color">
            <label className="Color-label">Color:</label>
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
            </div>
            <div className='Brush-size'>
                <label className='Brush-size-label' for='brushSize'>Brush Size</label>
                <input className='brush-size-toggle' type='range' value={brushSize} onChange={(e) => setBrushSize(e.target.value)} id='brushSize' name='brushSize' min='1' max='100'>
                </input>
            </div>
           
            <button className='Paint-download' onClick={() => { setDownloadImage('true') }}>Download Image</button>
            <button className='Paint-create' onClick={() => { setCreatePost('true') }}>Create Post</button>
            {/* {createPost && <CreateBlog imgUrl={imgUrl} />} */}
            {/* Pass imgUrl as a prop to CreateBlog */}

            <Sketch setup={setup} draw={draw} />

        </div>
      </div>
      
    );
}