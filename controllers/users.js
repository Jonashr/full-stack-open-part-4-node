const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async(request, response) => {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(request.body.password, saltRounds)

    const user = new User({
        name: request.body.name,
        username: request.body.username,
        passwordHash: passwordHash
    })

    try {
    const savedUser = await user.save()  
    return response.json(savedUser)   
    } catch(error){ 
        return response.status(400).json(error)
    }

})

usersRouter.get('/', async(request, response) => {
    const users = await User.find({})
    return response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
