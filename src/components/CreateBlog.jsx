import React, { createRef, useState } from 'react';
import axios from 'axios';
import p5 from 'p5';
import { useNavigate } from 'react-router-dom';
import Sketch from 'react-p5';
import cors from 'cors';
// import app from './src/components/app';
// import Cloudinary from 'cloudinary';

// app.use(cors({
//     origin: 'http://localhost:3000'
//   }));
  

const BASE_URL = 'http://localhost:3000';

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

    // Event handler for mouse click on canvas
    canvas.mousePressed((event) => {
      console.log('clicked on canvas', event);
    });
  };

  // Draw function for p5 canvas
  const draw = (p5) => {
    // Set background to black
    p5.background(0, 0, 0);

    // Set fill color based on selected color
    p5.fill(p5.color(color));

    // Set color mode for p5
    p5.colorMode(colorMode);

    if (p5.keyIsDown(p5.SHIFT)) {
      p5.noStroke();

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

    // Draw circles stored in the circles array
    for (const circle of circles) {
      p5.fill(p5.color(circle.paint));
      p5.ellipse(circle.xPos, circle.yPos, circle.size, circle.size);
    }

    // Save canvas as image if downloadImage is true
    if (downloadImage) {
      p5.saveCanvas('myCanvas', 'jpg');
      setDownloadImage(false);
    }
  };

  // Event handler for form submission
  const handleSubmit = (ev) => {
    ev.preventDefault();

    axios
      .post(`${BASE_URL}/blogs`, {
        title: title,
        author: author,
        img: img,
        content: content
      })
      .then((res) => {
        console.log('we\'ve made it to then');
        console.log('response', res);
        navigatePush('/');
      })
      .catch((err) => {
        console.error('error submitting data:', err);
      });
  };

  // Event handler for input changes
  const handleInput = (ev) => {
    switch (ev.target.name) {
      case 'title':
        setTitle(ev.target.value);
        break;
      case 'author':
        setAuthor(ev.target.value);
        break;
      case 'image':
        setImg(ev.target.value);
        break;
      case 'content':
        setContent(ev.target.value);
        break;
      default:
        console.log('Please try again');
    }
  };

  return (
    <div className="createBlog">
      <h2>Create a Blog!</h2>
      <div>
        <div>
          <label>Color:</label>
          <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
        </div>
        <div>
          <label htmlFor="brushSize">Brush Size</label>
          <input type="range" value={brushSize} onChange={(e) => setBrushSize(e.target.value)} id="brushSize" name="brushSize" min="1" max="100" />
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
        <div type="cloudinary"> 
        <button onClick={() => setDownloadImage(true)}>Download Image</button>
        {/* New lines of code below */}
        {/* <input ref={inputFileRef} accept="image/*" hidden id="image upload" type="file" onChange={handleOnChange}/> */}
        {/* <button onClick={(e) => cloudinarySubmit(e)}>Submit</button> */}
        </div>
        <Sketch setup={setup} draw={draw} />
      </div>
      <form className="postblogform" onSubmit={handleSubmit}>
        <div>
          <label>
            Title
            <input className="postbloginput" onChange={handleInput} name="title" type="text" required placeholder="PaintBlog title" />
          </label>
        </div>
        <div>
          <label>
            Author
            <input className="postbloginput" onChange={handleInput} name="author" type="text" required placeholder="Author" />
          </label>
        </div>
        <div>
          <label>
            Blog
            <input className="postbloginput" onChange={handleInput} name="content" type="text" placeholder="Your blog goes here" />
          </label>
        </div>
        <div className="postblogbutton">
          <button>Save blog</button>
        </div>
      </form>
    </div>
  );
}
