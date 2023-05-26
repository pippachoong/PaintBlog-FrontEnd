import React from 'react';
import axios from 'axios';
import p5 from 'p5';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sketch from 'react-p5';
import {fill} from "@cloudinary/url-gen/actions/resize";
import {CloudinaryImage} from '@cloudinary/url-gen';
import { AdvancedImage } from '@cloudinary/react';

// Base URL below
const BASE_URL = 'http://localhost:3000';
const myImage = new CloudinaryImage('bvbkk3iesl0epuwafypr', {cloudName: 'dba4baulm'}).resize(fill().width(100).height(150));


export default function CreateBlog(props) {
    
    
    const [mousePos, setMousePos] = useState({});
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');
    const [brushSize, setBrushSize] = useState(100);

    // testing out a save constant
    // const []

    // SETTING UP COLOR STATE
    const [color, setColor] = useState('red');
    const [colorModes, setColorModes] = useState({
    RGB: p5.RGB,
    HSB: p5.HSB
    });
    const [colorMode, setColorMode] = useState(p5.RGB);
    const [downloadImage, setDownloadImage] = useState('false');

    // array to save circles
    const [circles, setCircles] = useState([]);

    const navigatePush = useNavigate();
   
    const setup = (p5, canvasParentRef) => {

        const canvas = p5.createCanvas(500, 400).parent(canvasParentRef);
        
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
            case 'author':
                setAuthor(ev.target.value)
                break
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