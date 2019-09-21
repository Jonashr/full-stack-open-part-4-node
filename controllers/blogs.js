const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  return response.json(blogs.map(note => note.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    console.log(body)

    const user = await User.findOne()

    console.log(user)

    const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })

    try {
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    } catch(error) {
      console.log(error)
      response.status(400).json(error)
    }
  })

blogsRouter.delete('/:id', async (request, response, next) => {
  try {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
  } catch(exception) {
  response.status(404).json(exception)
  }
})

blogsRouter.put('/:id', async (request, response, next) => {
  const body = request.body


  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  }
  
  try { 
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    response.status(404).json(exception)
  }
})


module.exports = blogsRouter