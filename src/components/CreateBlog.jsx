import axios from 'axios';
import  { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Sketch from 'react-p5';


const BASE_URL = 'http://localhost:3000';

export default function CreateBlog(props) {
    
    
    const [mousePos, setMousePos] = useState({});
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');

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

        const canvas = p5.createCanvas(500, 400).parent(canvasParentRef)
        
        canvas.mousePressed((event) => {
            console.log('clicked on canvas', event)
        })
    }

    const draw = p5 => {
        p5.background(0, 0, 0)
        p5.ellipse(50, 50, 50)
        p5.fill(255, 0, 0)
        
        if(p5.keyIsDown(p5.SHIFT)){
            p5.noStroke();

            //mouse
            const mouseXNormalised = p5.mouseX / p5.windowWidth;
            const hue = mouseXNormalised * 255

            p5.fill(
                hue, 
                255,
                244
            );
            p5.ellipse(p5.mouseX, p5.mouseY, 50,50)
        }
    }

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
            <Sketch setup={setup} draw={draw} />
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