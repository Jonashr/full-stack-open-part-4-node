const app = require('./app')
const http = require('http')
const config = require('./utils/config')
const server = http.createServer(app)
const port = config.PORT

server.listen(port, () => {
    console.log(`Server running on port ${port}`)
})