const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const blogData = require('./test_data')

const api = supertest(app)

beforeEach(async () => {
    await blog.deleteMany({})
    let blogObject = new blog(blogData.initialBlogs[0])
    await blogObject.save()
    blogObject = new blog(blogData.initialBlogs[1])
    await blogObject.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(blogData.initialBlogs.length)
})

test('right content is returned', async () => {
    const response = await api.get('/api/blogs')

    const contents = response.body.map(r => r.title)
    expect(contents).toContain(
        'Go To Statement Considered Harmful'
        )
})

test('the id property of the blog object has the correct format', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0]).toHaveProperty('id')
    expect(response.body[0]).not.toHaveProperty('_id')
    
})

test('A valid blog post is saved to the DB', async () => {
    const newBlog = {
        title: 'Just a single blog',
        author: 'Marco Schaafsma',
        url: 'http://www.google.com',
        likes: 1
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    expect(contents).toHaveLength(blogData.initialBlogs.length + 1)
    expect(contents).toContain('Just a single blog')
})

afterAll(() => {
    mongoose.connection.close()
})