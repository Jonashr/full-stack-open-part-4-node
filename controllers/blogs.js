const blogsRouter = require('express').Router()
const Blog = require('../models/blog')


blogsRouter.get('/', async (request, response, next) => {
  const blogs = await Blog.find({})
  return response.json(blogs.map(note => note.toJSON()))
})
  
blogsRouter.post('/', (request, response, next) => {
    const blog = new Blog(request.body)
    console.log(request.body)
  
    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch((error) => {
        response.status(400).json(error)
      })
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
    likes: body.likes
  }
  
  try { 
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog)
    response.json(updatedBlog.toJSON())
  } catch(exception) {
    response.status(404).json(exception)
  }
})


module.exports = blogsRouter