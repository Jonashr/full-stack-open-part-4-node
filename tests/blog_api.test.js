const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')

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

const dummyUser = {
  username: 'Jonas',
  password: 'yoloyolo',
}

let token

beforeAll(async() => {
  await User.deleteMany({})
  await api
    .post('/api/users')
    .send(dummyUser)


  const result = await api
    .post('/api/login')
    .send(dummyUser)
    .expect(200)

  token = result.body.token
}, 30000)


beforeEach(async () => {
  await Blog.deleteMany({})

  for(let blog of initialBlogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('When there are initially three blogs', () => {
  // eslint-disable-next-line no-useless-escape

  test('Blogs are returned as application\/json format', async () => {
    await api.get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('GET /api/blogs returns the same length as the list of initialBlogs(3)', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body.length).toBe(initialBlogs.length)
  })

  test('The unique identifier is named id and not _id', async () => {
    const response = await api.get('/api/blogs')
    const body = response.body
    expect(body[0].id).toBeDefined()
  })

  test('A valid blog can be added and returns length of 4', async() => {
    const newBlog = {
      title: 'Newly added blog',
      author: 'Author of blog',
      url: 'http://url.com',
      likes: 50
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)

    const response = await api.get('/api/blogs')

    const titles = response.body.map(blog => blog.title)

    expect(response.body.length).toBe(initialBlogs.length + 1)
    expect(titles).toContain('Newly added blog')
  })

  test('If like attribute is missing from the request the value will default to 0', async() => {
    const newBlog = {
      title: 'Newly added blog',
      author: 'Author of blog',
      url: 'http://url.com',
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)

    const response = await api.get('/api/blogs')

    const lastBlog = response.body.slice(-1)

    expect(lastBlog[0].likes).toBeDefined()
    expect(lastBlog[0].likes).toBe(0)

  })

  test('A new blog without title and url responds with 400 - BAD REQUEST', async() => {
    const newBlog = {
      author: 'I am the author',
      likes: 50
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog).expect(400)

  })

  test('A new Blog that has title but without a url responds with 201 - CREATED', async () => {
    const newBlog = {
      author: 'I am the author',
      title: 'Title'
    }

    await api.post('/api/blogs')
      .send(newBlog)
      .set('authorization', `bearer ${token}`)
      .expect(201)
  })

  test('A new Blog with an url but without a title responds with 201 - CREATED', async () => {
    const newBlog = {
      author: 'I am the author',
      url: 'url goes here'
    }

    await api
      .post('/api/blogs')
      .set('authorization', `bearer ${token}`)
      .send(newBlog)
      .expect(201)
  })

  test('A Blog cannot be removed despite having a token attached if it does not match user id of the blog', async () => {
    await api
      .delete('/api/blogs/5a422aa71b54a676234d17f8')
      .set('authorization', `bearer ${token}`)
      .expect(401)
  })

})

afterAll(() => {
  mongoose.connection.close()
})