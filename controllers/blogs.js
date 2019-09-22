const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt =  require('jsonwebtoken')


blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  return response.json(blogs.map(note => note.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    try {
      const decodedToken = jwt.verify(request.token, process.env.SECRET_PASSWORD)
      if(!decodedToken.id) {
        return response.status(401).json({ error: 'Token missing or invalid'})
      }
      
     const user = await User.findById(decodedToken.id)

     const blog = new Blog ({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id
    })
      
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      await user.save()
      response.status(201).json(savedBlog.toJSON())
    } catch(error) {
      response.status(400).json(error)
    }
})

blogsRouter.delete('/:id', async (request, response, next) => {
  const body = request.body
  
  try {
    const decodedToken = jwt.verify(request.token, process.env.SECRET_PASSWORD)
    if(!decodedToken.id) {
      return response.status(401).json({ error: 'Token missing or invalid'})
    }  
    const user = await User.findById(decodedToken.id)

    const blog = await Blog.findById(request.params.id)

    if(blog.user.toString() !== user._id.toString()) {
      return response.status(401).json({ error: 'Token does not match the user'})
    } 
    await Blog.remove(blog)
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