require('dotenv').config()
const mongoose = require('mongoose')
const app = require('./app')
require('./models/Registration')
const PORT = 3000

mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection
    .on('open', () => {
        console.log('Mongoose connection open')
        console.log(process.env.DATABASE)
    })
    .on('error', (err) => {
        console.log('Mongoose connection error')
        console.log({error: err.message})
    })

const server = app.listen(PORT, () => {
    console.log(`Express is running on port ${server.address().port}`)
    console.log(`http://localhost:${PORT}/`)
})