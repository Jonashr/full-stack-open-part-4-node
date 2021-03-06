const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if(authorization && authorization.toLowerCase().startsWith('bearer')) {
    request.token = authorization.substring(7)
  }

  next()
}

const errorHandler = (error, request, response, next) => {
  console.log('Error handler:', error.message, error.name)

  if(error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if(error.name === 'ValidationError') {
    return response.status(400).send({ error: error.message })
  } else if (error.name === 'JsonWebTokenError') {
    return response.status(401).json({
      error: 'Invalid token'
    })
  }

  next(error)
}

module.exports = {
  tokenExtractor,
  errorHandler
}