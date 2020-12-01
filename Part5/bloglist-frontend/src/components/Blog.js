import React, { useState } from 'react'

const Blog = ({ blog }) => {
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


    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible}>
                {blog.title} {blog.author}
                <button onClick={() => setVisible(true)}>Show</button>
            </div>
            <div style={showWhenVisible}>
                <p>{blog.title} {blog.author}</p>
                <p>{blog.url}</p>
                <p>{blog.likes}</p>
                <button onClick={() => setVisible(false)}>hide</button>
            </div>
        </div>
    )
}


export default Blog