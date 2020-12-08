import React, { useState } from 'react'

const Blog = ({ blog, updateLikes, removeBlog }) => {
    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

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
        <div style={blogStyle} >
            <div style={hideWhenVisible} className="blog-collapse">
                {blog.title} {blog.author}
                <button onClick={() => setVisible(true)}>Show</button>
            </div>
            <div style={showWhenVisible} className="blog-extended">

                {blog.title} {blog.author}
                <button onClick={() => setVisible(false)}>hide</button>

                <p>{blog.url}</p>
                <p>{blog.likes}
                    <button onClick={() => updateLikes(updatedObject)} data-cy="like">
                        Like
                    </button>
                </p>
                <p>
                    <button onClick={() => removeBlog(updatedObject.id)} data-cy="remove">
                        Remove
                    </button>
                </p>
            </div>
        </div>
    )
}

export default Blog