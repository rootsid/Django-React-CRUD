import './App.css';
import {useState, useEffect} from 'react'
import ArticleList from './components/ArticleList';
import Form from './components/Form';
import {useCookies} from 'react-cookie'
import { useHistory } from 'react-router-dom';

function App() {
  // articles will be mapped on setArticles
  const [articles, setArticles] = useState([])
  // create another field to edit the article on home page
  const [editArticle, setEditArticle] = useState(null)
  // eslint-disable-next-line
  const [token, setToken, removeToken] = useCookies(['mytoken'])

  let history = useHistory()

  useEffect(() => {
    fetch('http://127.0.0.1:8000/articles/',
    {
      'method':'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Token ${token['mytoken']}`
      }
    })
    .then(resp => resp.json())
    .then(resp => setArticles(resp))
    // eslint-disable-next-line
    .catch(error => console.log(error))
    // eslint-disable-next-line
  }, [])

  useEffect(() => {
    if(!token['mytoken']) {
      history.pushState('/')
    }
  })

  const editBtn = (article) => {
    console.log("function called")
    setEditArticle(article)
    // now we have the track of article  and we get send the data to form.js
  }

  const updatedInformation = (article) => {
    const new_article = articles.map(myarticle => {
      if (myarticle.id === article.id ) {
        return article;
      }
      else {
        return myarticle;
      }
    })

    setArticles(new_article)
  }

  const insertedInformation = (article) => {
    const new_articles = [...articles, article]
    setArticles(new_articles)
  }

  const ArticleForm = () => {
    setEditArticle({
      title: "",
      description: ""
    })
  }

  const deleteBtn = (article) => {
    const new_articles = articles.filter(myarticle => {
      if (myarticle.id === article.id) {
        return false
      }
      return true;
    })

    setArticles(new_articles)
  }

  function logoutBtn() {
    removeToken('myToken');
  }

  return (
    // <!-- Passing props to article list function-->
    // pass the article to form function.
    //verify if value exists or not
    <div className="App">
      <div className = "row">
        <div className="col">
          <h3>Django And React Js Blog App</h3>
          <br />
        </div>
        <div className="col">
          <button className="btn btn-primary" onClick = {ArticleForm} >Insert Article</button>
        </div>
        <div className="col">
          <button className="btn btn-danger" onClick = {logoutBtn} >Log Out</button>
        </div>
        
      </div>
      <br />
      <ArticleList articles = {articles} editBtn = {editBtn} deleteBtn = {deleteBtn} />
      {editArticle ? <Form article = {editArticle} updatedInformation = {updatedInformation} insertedInformation = {insertedInformation} /> : null}
    </div>
  );
}

export default App;
