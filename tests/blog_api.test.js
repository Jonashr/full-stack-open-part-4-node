const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Blog 1',
        author: 'Author 1',
        url: 'http://url.com/1/',
        likes: 3
    },
    {
        _id: '5a422aa71b54a676234d17f2',
        title: 'Blog 2',
        author: 'Author 2',
        url: 'http://url.com/2/',
        likes: 13
    },
    {
        _id: '5a422aa71b54a676234d17f0',
        title: 'Blog 3',
        author: 'Author 3',
        url: 'http://url.com/2/',
        likes: 273
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})

    for(let blog of initialBlogs) {
        let blogObject = new Blog(blog)
        await blogObject.save()
    }
})

test('Blogs are returned as application\/json format', async () => {
    await api.get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
}, 10000)

test('There are four blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body.length).toBe(initialBlogs.length)
})

test('The unique identifier is named id', async () => {
    const response = await api.get('/api/blogs')
    const body = response.body
    console.log(body)
    expect(response.body[0].id).toBeDefined()
},  30000)

afterAll(() => {
    mongoose.connection.close()
})