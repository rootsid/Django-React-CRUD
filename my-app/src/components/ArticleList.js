import React from 'react'
import APIService from '../APIService'
import {useCookies} from 'react-cookie'

function ArticleList(props) {
    const [token] = useCookies(['mytoken'])

    const editBtn = (article) => {
        console.log(article)
        // it will notify app.js which article have been clicked and will fetch the data from app.js as props
        props.editBtn(article)
    }

    const deleteBtn = (article) => {
        APIService.DeleteArticle(article.id, token['mytoken'])
        .then(resp =>  props.deleteBtn(article))
    }

    return (
        <div>
            {props.articles && props.articles.map(article => {
            return (
            <div key={article.id}>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-primary" onClick={() => editBtn(article)}>Update</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger" onClick={() => deleteBtn(article)} >Delete</button>
                    </div>
                </div>
                
                
                <hr className="hrclass" /> 
            </div>
            )
            })}
        </div>
    )
}

export default ArticleList
