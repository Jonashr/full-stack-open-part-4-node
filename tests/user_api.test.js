const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')

beforeEach(async () => {
    await User.deleteMany({})
    const user = new User ({username: 'test', password: '12345'})
    await user.save()
}, 30000)

describe('When there is initially one user in the DB', () => {

    test('Can succesfully create a new user with valid name', async () => {
        const usersAtStart = await api.get('/api/users')
        const newUser = {
            username: 'Kermit',
            name: 'Jonas',
            password: '123456'
        }

        await api
            .post('/api/users')
            .send(newUser)
            .expect(200)
            .expect('Content-Type', /application\/json/)

        const usersAtTheEnd = await api.get('/api/users')


        expect(usersAtStart.body.length).toBe(usersAtTheEnd.body.length - 1)

        const userNames = usersAtTheEnd.body.map(user => user.username)

        expect(userNames).toContain(newUser.username)
    }, 30000)


    test('Attempting to create a new user with a username that already exists fails', async () => {
        const usersAtStart = await api.get('/api/users')
        
        const newUser = {
            username: 'test',
            name: 'Newname',
            password: 'erm'
        }

        const result = await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
            .expect('Content-Type', /application\/json/)
        
        expect(result.body.message).toContain('`username` to be unique')
        
        const usersAtTheEnd = await api.get('/api/users')

        expect(usersAtStart.body.length).toBe(usersAtTheEnd.body.length)
        
    }, 30000)

    afterAll(() => {
        mongoose.connection.close()
    })
})



