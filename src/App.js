import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [blog, setBlog] = useState({
    title: '',
    content: '',
    key: process.env.REACT_APP_API_KEY
  });
  const [title, setTitle] = useState('Blog Title');
  const [content, setContent] = useState('Content');
  const [textColor, setTextColor] = useState('');

  const handleChange = (e) => {
    setBlog({...blog, [e.target.id]: e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post(process.env.REACT_APP_API_URL, blog)
    console.log(res.data);
    setBlog({
      title: '',
      content: '',
      key: process.env.REACT_APP_API_KEY
    })
    setTitle(res.data.success ? 'Sucess' : 'Error')
    setContent(res.data.message)
    setTextColor(res.data.success ? 'placeholder:text-green-500' : 'placeholder:text-red-500')

    setTimeout(() => {
      setTitle('Blog Title');  
      setContent('Content')
      setTextColor('')
    }, 2000)
  }

  return (
    <div className="form grid">
        <div className="mt-2 mb-1">
          <input className={`input font-bold text-xl py-1 ${textColor}`} type="text" id="title" placeholder={title} value={blog.title}
          onChange={(e) => handleChange(e)}
          />
        </div>
        <div className="mt-1">
          <textarea className={`input resize-none text-base py-2 ${textColor}`} name="content" id="content" placeholder={content} rows="6" cols="30" value={blog.content} onChange={(e) => handleChange(e)}
          />
        </div>
          <button className={`mt-1.5 py-1 text-xl font-bold text-white rounded ${!blog.title || !blog.content ? 'bg-gray-700' : 'bg-primary hover:bg-secondary'}`} disabled={!blog.title || !blog.content} onClick={(e) => handleSubmit(e)}>Publish</button>
    </div>
  );
}

export default App;
