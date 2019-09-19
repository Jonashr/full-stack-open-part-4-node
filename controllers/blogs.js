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
  })

module.exports = blogsRouter