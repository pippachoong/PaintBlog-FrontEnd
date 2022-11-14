import axios from 'axios';
import react, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { redirect } from 'react-router-dom';

const BASE_URL = 'http://localhost:3000';

export default function CreateBlog(props) {

    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [img, setImg] = useState('');
    const [content, setContent] = useState('');

    const navigatePush = useNavigate();

    
    const handleSubmit = (ev) => {
        console.log('form submitted');
        ev.preventDefault()
        
        axios.post(`${BASE_URL}/blogs`, {
                title: title,
                author: author,
                img: img,
            content: content
        })
        .then(res => {
            console.log(`we've made it to then`)
            console.log('response', res)
            navigatePush('/')
        })
        .catch(err => {
            console.error(`error submitting data:`, err)
        })
        // ev.preventDefault()
        // try {
        
        // await axios.post(`${BASE_URL}/blogs`, {
        //     title: title,
        //     author: author,
        //     img: img,
        //     content: content,
        // })

        // navigatePush(`/`)

        // }catch(err){
        //     console.error(`error submitting data:`, err)
        // }
        
    }

    const handleInput = (ev) => {
        // console.log(ev.target)
        // console.log('input changing', ev.target.value);
        // console.log('title changing', ev.target.name);
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
            
            <form className="postblogform" onSubmit={handleSubmit} >

                <div>
                <input className="postbloginput" onChange={handleInput}
                name="title"
                type="text"
                required
                placeholder='give your PaintBlog post a title'
                />
                </div>
                <div>
                <input className="postbloginput" onChange={handleInput}
                name="author"
                type="text"
                required
                placeholder='Author'
                />
                </div>
                <div>
                <input className="postbloginput" onChange={handleInput}
                name="image"
                type="text"
                required
                placeholder='Image URL'
                />
                </div>
                <div>
                <input className="postbloginput" onChange={handleInput}
                name="content"
                type="text"
                placeholder='Your blog goes here'
                />
                </div>
                <div className="postblogbutton">
                <button>Save blog</button>
                </div>
            </form>
           

          </div>
        );
}