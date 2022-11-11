import react from 'react';
import {useState, useEffect} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

let BASE_URL = 'http://localhost:3000';

export default function BlogPost (props){

    const {id} = useParams();

    const [loading, setLoading] = useState(false);
    const [blogPost, setBlogPost] = useState({});
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        axios.get(`${BASE_URL}/blogs/${id}`)
            .then(
                res => {
                    setBlogPost(res.data);
                    setLoading(false);
                }
            )
            .catch(err => {
                console.warn(`Error`, err);
                setLoading(false);
            })
    }, [])

    console.log(`blogPost is: `, blogPost);

    return(

        <div>
            {
                loading
                ?
                (<div> Loading Blog ... </div>)
                :
                (<div>{blogPost._id}</div>)
            }
        </div>

    );



}

// export default BlogPost;