import './App.css';
import {useState, useEffect} from 'react'
import ArticleList from './components/ArticleList';
import Form from './components/Form';

function App() {
  // articles will be mapped on setArticles
  const [articles, setArticles] = useState([])
  // create another field to edit the article on home page
  const [editArticle, setEditArticle] = useState(null)

  useEffect(() => {
    fetch('http://127.0.0.1:8000/articles/',
    {
      'method':'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Token b58d38490ee8d5c24751ea1ba226a3586e641907'
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    .catch(error => console.log(error))
  }, [])

  const editBtn = (article) => {
    console.log("function called")
    setEditArticle(article)
    // now we have the track of article  and we get send the data to form.js
  }

  return (
    // <!-- Passing props to article list function-->
    // pass the article to form function.
    //verify if value exists or not
    <div className="App">
      <h3>Django And React Js Blog App</h3>
      <br />
      <br />
      <ArticleList articles = {articles} editBtn = {editBtn} />
      {editArticle ? <Form article = {editArticle} /> : null}
    </div>
  );
}

export default App;
