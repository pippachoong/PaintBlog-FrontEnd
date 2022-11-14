import logo from './logo.svg';
import './App.css';
import './components/Gallery';
import Gallery from './components/Gallery';
import {HashRouter as Router, Link, Route, Routes} from "react-router-dom";
import BlogPost from './components/BlogPost';


function App() {
  return (
    <div className="App">
      <h1> Welcome to Paint Blog! The best blog ever! </h1>
      <Router>
        <Routes>
            <Route path="/" element={<Gallery/>}/>
            <Route path="/blogs/:id" element={<BlogPost/>}/>


          </Routes>
      </Router>


    </div>
  );
}

export default App;
