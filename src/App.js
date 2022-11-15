import logo from './logo.svg';
import './App.css';
import './components/Gallery';
import Gallery from './components/Gallery';
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import BlogPost from './components/BlogPost';
import CreateBlog from './components/CreateBlog';


function App() {
  return (
    <div className="App">
      <h1> Welcome to Paint Blog! The best blog ever! </h1>
      {/* <Router> */}
      <nav>
        <Link to='/'>Homepage</Link>
        <Link to='/create'>New Blog</Link>
      </nav>
        <Routes>
            <Route path="/" element={<Gallery/>}/>
            <Route path="/blogs/:id" element={<BlogPost/>}/>
            <Route path="/create" element={<CreateBlog/>}/>


          </Routes>
      {/* </Router> */}
 .

    </div>
  );
}

export default App;
