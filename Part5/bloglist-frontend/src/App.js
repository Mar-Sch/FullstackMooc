import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('') 
    const [user, setUser] = useState(null)
    //these are used to create a new blog entry
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        )
    }, [])

    const handleLogin = async (event) => {
        event.preventDefault()
        try {
            const user = await loginService.login({
                username, password,
            })
            blogService.setToken(user.token)
            setUser(user)
            window.localStorage.setItem(
                'loggedBlogappUser', JSON.stringify(user)
            )
            setUsername('')
            setPassword('')
        } catch (error) {
            console.log('Wrong credentials')
            setTimeout(() => {
                console.log('timeout')
            }, 5000)
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const handleNewTitle = (event) => {
        setTitle(event.target.value)
    }

    const handleNewAuthor = (event) => {
        setAuthor(event.target.value)
    }

    const handleNewUrl = (event) => {
        setUrl(event.target.value)
    }

    const AddNewBlog = (event) => {
        event.preventDefault()
        const blogObject = {
            title: title,
            author: author,
            url: url,
        }

        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                setUser('')
                setAuthor('')
                setUrl('')
            })
    }

    const loginForm = () => (
        <form onSubmit={handleLogin}>
            <div>
                username
                    <input
                    type="text"
                    value={username}
                    name="Username"
                    onChange={({ target }) => setUsername(target.value)}
                />
            </div>
            <div>
                password
                    <input
                    type="password"
                    value={password}
                    name="Password"
                    onChange={({ target }) => setPassword(target.value)}
                />
            </div>
            <button type="submit">login</button>
        </form>
    )

    const createNew = () => (
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

    const blogList = () => (
        <div>
            {
                blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                )
            }
        </div>
    )

    return (
        <div>
          <h2>blogs</h2>

            {user === null ?
                loginForm() :
                <div>
                    <p>
                        {user.name} logged-in
                        &nbsp;
                        <button
                            onClick={handleLogout}>
                            {'logout'}
                        </button>                          
                    </p>
                    {createNew()}
                    {blogList()}
                    </div>
            }
            
           
    </div>
  )
}

export default App