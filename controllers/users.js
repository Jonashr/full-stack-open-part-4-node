const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response) => {
    const saltRounds = 10
    console.log(saltRounds)
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)
    console.log(passwordHash)

    const user = new User({
        name: request.body.name,
        username: request.body.username,
        passwordHash: passwordHash
    })

    const savedUser = user.save()

    return response.json(savedUser)
})

usersRouter.get('/', async(request, response) => {
    const users = await User.find({})
    console.log(users)
    return response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
