const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const blog = require('../models/blog')
const blogData = require('./test_data')
const user = require('../models/user')
const helper = require('./test_helper')
const bcrypt = require('bcrypt')


const api = supertest(app)

/*
beforeAll(async () => {
    await user.deleteMany({})

    const saltRounds = 10
    const passwordHash = await bcrypt.hash('willem', saltRounds)

    const newUser = [
        {
            username: 'willem',
            name: 'Willen van Oranje',
            passwordHash
        }
    ]
    let userObject = new user(newUser)
    await userObject.save()
})
*/

beforeEach(async () => {
    
    await user.deleteMany({})

    const newUser = 
        {
            username: 'willem',
            name: 'Willen van Oranje',
            password: 'willem'
        }
        
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(newUser.password, saltRounds)
        
    const dbUser = {
        username: newUser.username,
        name: newUser.name,
        passwordHash,
    }
    
    let userObject = new user(dbUser)
    await userObject.save()
    
    await blog.deleteMany({})
    let blogObject = new blog(blogData.initialBlogs[0])
    await blogObject.save()
    blogObject = new blog(blogData.initialBlogs[1])
    await blogObject.save()


})


describe('Making sure that data fetching works correctly', () => {
    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('unknown endpoint returns 404', async () => {
        await api
            .get('/api/invalid')
            .expect(404)
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
})

describe('We are able to post a valid new blog', () => {
  
    test('A valid blog post is saved to the DB', async () => {
        //login
        let token = null
        const user = [{
            username: 'willem',
            password: 'willem'
        }]

        await api
            .post('api/login')
            .send(user)
            .then((res) => {
                return (token = res.body.token)
            })

        const newBlog = {
            title: 'Just a single blog',
            author: 'Marco Schaafsma',
            url: 'http://www.google.com',
            likes: 1
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const response = await api.get('/api/blogs')
        const contents = response.body.map(r => r.title)

        expect(contents).toHaveLength(blogData.initialBlogs.length + 1)
        expect(contents).toContain('Just a single blog')
    })

    test('If the likes property is missing from a post request, it will set it to default value 0', async () => {
        const newBlog = {
            title: 'Missing likes property',
            author: 'Marco Schaafsma',
            url: 'http://www.google.com',
            userId: "5fc15f66ea7c4a36d0a14b39"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)


        const response = await api.get('/api/blogs')
        const addedBlog = response.body[2]

        expect(addedBlog.likes).toBe(0)

    })

    test('Missing title and URL in a post request, will return status 400 Bad Request', async () => {
        const newBlog = {
            author: 'Marco Schaafsma',
            likes: 1,
            userId: "5fc15f66ea7c4a36d0a14b39"
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)

    })
})

describe('We are able to delete a blog', () => {
    test('Successfull deletion of blog', async () => {

        const response = await api.get('/api/blogs').expect(200)
        expect(response.body[0]).toHaveProperty('id')

        const blogToDelete = response.body[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
    })
})


describe('We are able to update a blog', () => {
    test('We can change the amount of likes', async () => {

        const response = await api.get('/api/blogs').expect(200)

        const blogToUpdate = {
            title: response.body[0].title,
            author: response.body[0].author,
            url: response.body[0].url,
            likes: 5000
        }
         
        await api
            .put(`/api/blogs/${response.body[0].id}`)
            .send(blogToUpdate)
            .expect(200)
    })
})

describe('we are able to create only valid new users', () => {
    test('creation of new user in empty DB', async () => {
        await user.deleteMany({})
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'marcos',
            name: 'Marcos diMaria',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        expect(usernames).toContain(newUser.username)

    })

    test('we cannot add a user with the same username twice', async () => {
        const newUser = {
            username: 'marcos',
            name: 'marco diSanto',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('new user with too short password is giving status code 400 bad request', async () => {
        const newUser = {
            username: 'james',
            name: 'James Bond',
            password: 'se',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('new user with too short username is giving status code 400 bad request', async () => {
        const newUser = {
            username: 'j',
            name: 'James Bond',
            password: 'secret',
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })
})


afterAll(() => {
    mongoose.connection.close()
})