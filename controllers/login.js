const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async(request, response) => {
  const body = request.body
  console.log(request)
  console.log(body)

  const user = await User.findOne({ username: body.username })
  console.log('USer', user, body.password, user.passwordHash)

  const passwordIsCorrect = user === null ? false
    : await bcrypt.compare(body.password, user.passwordHash)

  if(user === null || !passwordIsCorrect) {
    return response.status(401).json({
      error: 'Invalid username or password'
    })
  }

  console.log('this far')

  const userToken = {
    username: user.username,
    id: user._id
  }


  const token = jwt.sign(userToken, process.env.SECRET_PASSWORD)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })

})

module.exports = loginRouter