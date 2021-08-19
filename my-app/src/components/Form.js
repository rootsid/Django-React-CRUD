import React, {useState} from 'react'
import APIService from '../APIService'

function Form(props) {
    // as props are immutable, have to create a new state to contain a copy of it.
    const [title, setTitle] = useState(props.article.title)
    const [description, setDescription] = useState(props.article.description)

    const updateArticle = () => {
        console.log(props.article)
        APIService.UpdateArticle(props.article.id, {title, description})
        .then(resp => console.log(resp))
    }

    return (
        <div>
            {props.article ? (
                <div className="mb-3">
                    <label htmlFor = "title" className="form-label">
                        Title
                    </label>
                    <input type="text" className="form-control" id="title" placeholder="Please Enter the title" value={title} 
                    onChange = {e => setTitle(e.target.value)}
                    /> <br />
                    <label htmlFor = "description" className="form-label">
                        Description
                    </label>
                    <textarea className="form-control" id="description" rows="5" value={description}
                    onChange = {e => setDescription(e.target.value)}
                    ></textarea> <br />
                    <button onClick={updateArticle} className="btn btn-success">Update Article</button>
                </div>
            ) : (
                <div className="mb-3">
                    Got and error
                </div>
            )}
        </div>
    )
}

export default Form
