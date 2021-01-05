import React, { useState } from 'react'
import { Button, Form } from 'react-bootstrap'

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
                <Form.Group>
                    <div>
                        <Form.Label>title: </Form.Label>
                        <Form.Control
                            id='title'
                            type="text"
                            value={title}
                            name="title"
                            onChange={handleNewTitle}
                        />
                    </div>
                    <div>
                        <Form.Label>author:</Form.Label>
                        <Form.Control
                            id='author'
                            type="text"
                            value={author}
                            name="author"
                            onChange={handleNewAuthor}
                        />
                    </div>
                    <div>
                        <Form.Label>url:</Form.Label>
                        <Form.Control
                            id='url'
                            type="text"
                            value={url}
                            name="url"
                            onChange={handleNewUrl}
                        />
                    </div>
                    <Button variant="success" id="submit-Button" type="submit">Create</Button>
                </Form.Group>
            </form>
        </div>

    )
}

export default BlogForm

