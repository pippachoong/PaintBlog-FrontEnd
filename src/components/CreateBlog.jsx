import axios from 'axios';
import p5 from 'p5';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sketch from 'react-p5';

// Base URL below


const BASE_URL = 'http://localhost:3000';

export default function CreateBlog(props) {
    
    
    const [mousePos, setMousePos] = useState({});
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');

    // SETTING UP COLOR STATE
    const [color, setColor] = useState('red');
    const [colorModes, setColorModes] = useState({
    RGB: p5.RGB,
    HSB: p5.HSB
    });
    const [colorMode, setColorMode] = useState(p5.RGB);

    // array to save circles
    const [circles, setCircles] = useState([]);

    const navigatePush = useNavigate();

    
    // useEffect (() => {
    //     const handleMouseMove = (event) => {

    //         setMousePos({ x: event.clientX, 
    //                       y: event.clientY
    //                     })
            
    //     }    

    //     window.addEventListener('mousemove', handleMouseMove);
    //     return () => {
    //         window.removeEventListener(
    //             'mousemove',
    //             handleMouseMove
    //         )
    //     }
    // }, [])
   
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
    }

    const draw = p5 => {
        // background is set to black
        p5.background(0, 0, 0)
        // brush size and shape // Removes inital placement of eclipse 
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
                50,50 // TODO: make this an input and variable for pen/brush size
            )
            // const arrayCircles = []
            // Add a paint factor for the circles 
            const newCircle = {
                xPos: p5.mouseX,
                yPos: p5.mouseY, 
                size: 3, // TODO: need to make this adjustable also
                hue: hue
            }
            circles.push(newCircle);
            p5.background(0);
            // setCircles(arrayCircles);
            
        }
        
        for (const circle of circles){
            p5.fill( p5.color(color));
            p5.ellipse(circle.xPos, circle.yPos, circle.size, circle.size)
        }
    }
    

    // const updateCircles = p5 =>{
    //     p5.background(0);

    //     for (const circle of circles){
    //           p5.fill( circle.hue, 255, 255 );
    //           p5.ellipse(circle.xPos, circle.yPos, circle.size, circle.size)
    //     }
    // };



    // function draw(){s
        
    // }

    
    const handleSubmit = (ev) => {
        console.log('form submitted');
        ev.preventDefault()
        
        axios.post(`${BASE_URL}/blogs`, {
            "title": title,
            "author": author,
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

    return (

          <div className="createBlog">
            <h2>Create a Blog!</h2>
            <div>
                <div>
                <label>Color:</label>
                <input type="color" value={color} onChange={(e) => setColor(e.target.value)} />
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
                <div>
                    <label>
                        Image
                        <input className="postbloginput" onChange={handleInput}
                        name="image"
                        type="text"
                        required
                        placeholder='Image URL'
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
                <div className="postblogbutton">
                <button>Save blog</button>
                </div>
            </form>
           

          </div>
        );
}