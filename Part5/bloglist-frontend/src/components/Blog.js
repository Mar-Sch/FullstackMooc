import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

const Blog = ({ blog, updateLikes, removeBlog }) => {

    const [visible, setVisible] = useState(false)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }


    let updatedObject = {
        id: blog.id,
        user: blog.user,
        likes: blog.likes + 1,
        author: blog.author,
        title: blog.title,
        url: blog.url
    }

    return (
        <div>
            <div style={hideWhenVisible} className="blog-collapse">
                <td>{blog.title}</td>
                <td>{blog.author}</td>
                <td><Button variant="secondary" onClick={() => setVisible(true)}>Show</Button></td>
            </div>
            <div style={showWhenVisible} className="blog-extended">

                {blog.title} {blog.author}
                <Button variant="secondary" onClick={() => setVisible(false)}>hide</Button>

                <p>{blog.url}</p>
                <p>{blog.likes}
                    <Button variant="success" onClick={() => updateLikes(updatedObject)} data-cy="like">
                        Like
                    </Button>
                </p>
                <p>
                    <Button variant="danger" onClick={() => removeBlog(updatedObject.id)} data-cy="remove">
                        Remove
                    </Button>
                </p>
            </div>
        </div>
    )
}

export default Blog