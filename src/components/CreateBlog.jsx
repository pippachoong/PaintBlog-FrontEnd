import React, { createRef, useState } from 'react';
import axios from 'axios';
import p5 from 'p5';
import { useNavigate } from 'react-router-dom';
import Sketch from 'react-p5';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

// Base URL below
const BASE_URL = 'http://localhost:3000';
const myImage = new CloudinaryImage('bvbkk3iesl0epuwafypr', {cloudName: 'dba4baulm'}).resize(fill().width(100).height(150));


export default function CreateBlog(props) {
  // State variables
  const [mousePos, setMousePos] = useState({});
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [img, setImg] = useState('');
  const [content, setContent] = useState('');
  const [brushSize, setBrushSize] = useState(100);
  const [color, setColor] = useState('red');
  const [colorModes, setColorModes] = useState({
    RGB: p5.RGB,
    HSB: p5.HSB
  });
  const [colorMode, setColorMode] = useState(p5.RGB);
  const [downloadImage, setDownloadImage] = useState(false);
  const [circles, setCircles] = useState([]);
  const navigatePush = useNavigate();

  // Upload cloudinary
  const [upload, setUpload] = useState();
  const [imageUpload] = useState({});
  const inputFileRef = createRef();
  const cleanup = () => {
    URL.revokeObjectURL(img);
    inputFileRef.current.value = null;
  };

  

//   // Saving the image
//   const setImage = (newImage) =>{
//     if(img){
//         cleanup();
//     }
//     setImage(newImage);
//   };


//   // Cloudinary handle change image
//   const handleOnChange = (ev) => {
//     const newImage = ev.target.file[0];
//     if (newImage){
//         setImage(URL.createObjectURL(newImage));
//     }
//     imageUpload(ev)
//   };

//   const handleImg = (e) => {
//     if(e.target.files[0]){
//         setImg({
//             src: URL.createObjectURL(e.target.files[0]),
//             alt: e.target.files[0].name
//         });
//     }
//   }

//   const profileUpload = async (file) => {
//     const formData = new FormData()
//     formData.append("file", file)
//     formData.append("upload_preset", "cloudinary1" )
//     let data = "";
//     await axios
//         .post(
//             "https:api.cloudinary.com/v1_1/cloudinary1/image/upload",
//             formData)
//         .then(( response) => {
//             data = response.data["secure_url"];
//         });
//         return data; 

//     }

//     const cloudinarySubmit = async (e) =>{
//         imageUpload.image = img;
//         await profileUpload(img);
//     }


    // const cloudinary = new Cloudinary({
    //     cloud: {
    //         cloudName: 'du7c4cskj',
    //         apiKey: '125263124857665',
    //         apiSecret:'XEy4vhZBuMALq9jQzT3eao2xRmc'
    //     }
    // }) 


  // Setup function for initializing p5 canvas
  const setup = (p5, canvasParentRef) => {
    const canvas = p5.createCanvas(500, 400).parent(canvasParentRef);

    // Create color picker and update color state
    const colorPicker = p5.createColorPicker(color);
    colorPicker.input((c) => {
      setColor(c.hex);
    });

    const draw = p5 => {
        // background is set to black
        p5.background(0, 0, 0)
        // brush size and shape
        // p5.ellipse(100, 100, 100)
        // fill is the paint brush // FILL DYNAMICALLY CHANGES
        p5.fill(p5.color(color));

        // COLOR MODE SET
        p5.colorMode(colorMode);
        // p5.colorMode(color_picker.color());

        // p5.colorMode(p5.HSB, 100);
        // for (let i = 0; i < 100; i++) {
        // for (let j = 0; j < 100; j++) {
        //     p5.stroke(i, j, 100);
        //     p5.point(i, j);
        // }
        // }
        
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
            setDownloadImage('false');
        }
    }
    

    

    
    const handleSubmit = (ev) => {
        console.log('form submitted');
        
        ev.preventDefault()
        
        axios.post(`${BASE_URL}/blogs`, {
            "title": title,
            "author": author,
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

      // Calculate normalized mouse X position
      const mouseXNormalised = p5.mouseX / p5.windowWidth;

      // Calculate hue based on mouse position
      const hue = mouseXNormalised * 255;

      // Draw ellipse at mouse position with brush size
      p5.ellipse(p5.mouseX, p5.mouseY, brushSize, brushSize);

      // Create new circle object with position, size, hue, and color
      const newCircle = {
        xPos: p5.mouseX,
        yPos: p5.mouseY,
        size: brushSize,
        hue: hue,
        paint: color
      };

      // Add new circle to the circles array
      circles.push(newCircle);

      // Clear the canvas
      p5.background(0);
    }

    // TODO : The image we paint, needs to be saved as a file, not a name which then gets posted to the backend...  


    //  Step 1: Download canvas into an image -  complete


    //  Step 3: Use URL as img Value i.e. setImg(ev.target.value)
    //  Step 4: Get handleSumbit and Post to backend
    //  bvbkk3iesl0epuwafypr
    

    return (

          <div className="createBlog">
            <h2>Create a Blog!</h2>
            <div>
                <div>
                <label>Color:</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
                </div>
                <div>
                    <label for='brushSize'>Brush Size</label>
                    <input type='range' value={brushSize} onChange={(e) => setBrushSize(e.target.value)} id='brushSize' name='brushSize' min='1' max='100'>
                    </input>
                </div>
                <div>
                <label>Color Mode:</label>
                <select value={colorMode} onChange={(e) => setColorMode(colorModes[e.target.value])}>
                    {Object.keys(colorModes).map((key) => (
                    <option key={key} value={key}>
                        {key}
                    </option>
                    ))}
                </select>
                </div>
                        <button onClick={() => {setDownloadImage('true')}}> Download Image</button>
                <Sketch setup={setup} draw={draw} />
            </div>
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
                        Author
                        <input className="postbloginput" onChange={handleInput}
                        name="author"
                        type="text"
                        required
                        placeholder='Author'
                        />
                    </label>
                </div>

                {/* Image should not be an upload of an image it should be a paint */}
                {/* <div>
                    <label>
                        Image
                        <input className="postbloginput" onChange={handleInput}
                        name="image"
                        type="text"
                        required
                        placeholder='Image URL'
                        />
                    </label>
                </div> */}
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
                <div className="postblogbutton">
                <button >Save blog</button>
                </div>
            </form>

              <div>
                  <AdvancedImage cldImg={myImage} />
              </div>

          </div>
        );
}
