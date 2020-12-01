import React, { useState } from 'react'

const Blog = ({ blog, updateLikes }) => {
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
            user: blog.key,
            likes: blog.likes +1,
            author: blog.author,
            title: blog.title,
            url: blog.url
        }

   

    return (
        <div style={blogStyle}>
            <div style={hideWhenVisible}>
                {blog.title} {blog.author}
                <button onClick={() => setVisible(true)}>Show</button>
            </div>
            <div style={showWhenVisible}>
                <p>{blog.title} {blog.author}</p>
                <p>{blog.url}</p>
                <p>{blog.likes}
                    <button onClick={() => updateLikes(updatedObject) }>
                        Like
                        </button>
                </p>


                <button onClick={() => setVisible(false)}>hide</button>
            </div>
        </div>
    )
}


export default Blog