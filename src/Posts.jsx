import './App.css';
import React, {useState, useEffect} from 'react'

const Posts = () => {

// Komponentin tilan määritys
const [posts, setPosts] = useState([])

useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
    .then(res => res.json()) //muutetaan json data javascriptiksi
    .then(oliot => setPosts(oliot))
  },[]
  )

  return (
    <>
        <h3>Posts from typicode</h3>  

        {
            posts && posts.map(p =>
                <div className='posts' key={p.id}>

            <p>{p.title}</p>
            <p>{p.body}</p>
            
            </div>
            )
        }     
      
    </>
  );
}

export default Posts;