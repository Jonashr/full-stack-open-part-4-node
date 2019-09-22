const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt =  require('jsonwebtoken')

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, name: 1})
  return response.json(blogs.map(note => note.toJSON()))
})
  
blogsRouter.post('/', async (request, response, next) => {
    const body = request.body

    const token = getTokenFrom(request)

    try {
      const decodedToken = jwt.verify(token, process.env.SECRET_PASSWORD)
      console.log(decodedToken.id)
      if(!token || !decodedToken.id) {
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