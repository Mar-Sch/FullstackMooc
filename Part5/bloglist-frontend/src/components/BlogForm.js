import React, { useState } from 'react'

const BlogForm = ({ AddNewBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleNewTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleNewAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleNewUrl = (event) => {
        setUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        AddNewBlog({
            title: title,
            author: author,
            url: url,
        })

        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div className="formDiv">
            <h3>Create new</h3>
            <form onSubmit={addBlog}>
                <div>
                    title
                    <input
                        id='title'
                        type="text"
                        value={title}
                        name="title"
                        onChange={handleNewTitle}
                    />
                </div>
                <div>
                    author
                    <input
                        id='author'
                        type="text"
                        value={author}
                        name="author"
                        onChange={handleNewAuthor}
                    />
                </div>
                <div>
                    url
                    <input
                        id='url'
                        type="text"
                        value={url}
                        name="url"
                        onChange={handleNewUrl}
                    />
                </div>
                <button id="submit-button" type="submit">Create</button>
            </form>
        </div>

    )
}

export default BlogForm

