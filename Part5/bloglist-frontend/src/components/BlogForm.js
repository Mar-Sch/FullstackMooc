import React from 'react'

const BlogForm = ({
    AddNewBlog,
    handleNewTitle,
    handleNewAuthor,
    handleNewUrl,
    title,
    author,
    url
}) => {
    return (
        <div>
            <h3>Create new</h3>
            <form onSubmit={AddNewBlog}>
                <div>
                    title
                        <input
                        type="text"
                        value={title}
                        name="title"
                        onChange={handleNewTitle}
                    />
                </div>
                <div>
                    author
                        <input
                        type="text"
                        value={author}
                        name="author"
                        onChange={handleNewAuthor}
                    />
                </div>
                <div>
                    url
                        <input
                        type="text"
                        value={url}
                        name="url"
                        onChange={handleNewUrl}
                    />
                </div>
                <button type="submit">Create</button>
            </form>
        </div>

    )
}

export default BlogForm

