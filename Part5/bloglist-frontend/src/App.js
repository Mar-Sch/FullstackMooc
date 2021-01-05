import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Menu from './components/Menu'
import About from './components/About'
import { Table, Button } from 'react-bootstrap'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [user, setUser] = useState(null)
    const [notificationMessage, setNotificationMessage] = useState([])
    const blogFormRef = useRef()

    useEffect(() => {
        blogService.getAll().then(blogs => {
            blogs.sort((a, b) => (a.likes > b.likes) ? -1 : 1)
            setBlogs(blogs)
        }
        )
    }, [])

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            blogService.setToken(user.token)
        }
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
        } catch (exception) {
            handleNotificationMessage(['Wrong credentials', 'error'])
            setUsername('')
            setPassword('')
        }
    }

    const handleLogout = async (event) => {
        event.preventDefault()
        setUser(null)
        window.localStorage.removeItem('loggedBlogappUser')
    }

    const handleNotificationMessage = (message) => {
        const messageToShow = message[0]
        const withClassName = message[1]
        setNotificationMessage([messageToShow, withClassName])
        setTimeout(() => { setNotificationMessage([]) }, 5000)
    }

    const addNewBlog = (blogObject) => {
        blogFormRef.current.toggleVisibility()
        blogService
            .create(blogObject)
            .then(returnedBlog => {
                setBlogs(blogs.concat(returnedBlog))
                handleNotificationMessage([`${blogObject.title} successfully added`, 'notification'])
            }).catch(error => {
                handleNotificationMessage([`${error.response.data.error}`, 'error'])
                console.log(error.response.data)
            })
    }

    const updateBlog = (blogObject) => {
        blogService
            .update(blogObject.id, blogObject)
            .then(response => {
                setBlogs(blogs.map(blog => blog.id !== blogObject.id ? blog : response.data))
            })
    }

    const removeBlog = (id) => {
        if (window.confirm('Do you really want to delete this blog?')) {
            blogService
                .remove(id)
                .then(res => {
                    setBlogs(blogs.filter(blog => blog.id !== id))
                    console.log(res)
                })
        }
    }

    const loginForm = () => (
        <Togglable buttonLabel='login'>
            <LoginForm
                username={username}
                password={password}
                handleUsernameChange={({ target }) => setUsername(target.value)}
                handlePasswordChange={({ target }) => setPassword(target.value)}
                handleSubmit={handleLogin}
            />
        </Togglable>
    )

    const blogForm = () => (
        <Togglable  buttonLabel='new blog' ref={blogFormRef}>
            <BlogForm AddNewBlog={addNewBlog}/>
        </Togglable>
    )

    const blogList = () => (
        <Table striped bordered>
            <tbody>
                {
                    blogs.map(blog =>
                        <tr key={blog.id}>
                            <Blog blog={blog} updateLikes={updateBlog} removeBlog={removeBlog} />
                        </tr>
                    )
                }
            </tbody>
        </Table>
    )

    return (
        <Router>
            <div className="container">
                <Menu />
                <h2>Blogs</h2>
                <Notification message={notificationMessage[0]} className={notificationMessage[1]} />

                {user === null ?
                    loginForm() :
                    <div>
                        <em>
                            {user.name} logged-in
                        &nbsp;
                            <Button variant="dark"
                                onClick={handleLogout}>
                                {'logout'}
                            </Button>
                        </em>
                        <Switch>
                            <Route path="/blogs">
                                {blogForm()}
                                {blogList()}
                            </Route>
                            <Route path="/about">
                                <About />
                            </Route>
                        </Switch>
                    </div>
                }
            </div>
        </Router>
    )
}

export default App