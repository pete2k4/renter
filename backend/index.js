const express = require('express')
const app = express()
require('dotenv').config()

const User = require('./models/user')
const Property = require('./models/property')

const cors = require('cors')

app.use(cors(), express.static('dist'))
const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
  }
app.use(express.json())
app.use(requestLogger)


app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/users', (request, response) => {
    User.find({}).then(users => {
        response.json(users)
    })
})

app.get('/api/properties', (request, response) => {
    Property.find({}).then(property => {
        response.json(property)
    })
})


app.get('/api/users/:id', (request, response) => {
    User.findById(request.params.id).then(user => {
        if (user) {
            response.json(user)
        } else {
            response.status(404).end()
        }
    })
})


app.post('/api/users', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const user = new User({
        name: body.name,
        phoneNumber: body.phoneNumber
    })

    user.save().then(savedUser => {
        response.json(savedUser)
    })
}) 

app.post('/api/properties', (request, response) => {
    const body = request.body

    if (body.name === undefined) {
        return response.status(400).json({error: 'content missing'})
    }

    const property = new Property({
        name: body.name,
        adress: body.adress
    })

    property.save().then(savedProperty => {
        response.json(savedProperty)
    })
}) 

app.put('/api/users', (request, response) => {
    const body = request.body

    const user = {
        name: body.name,
        phoneNumber: body.phoneNumber
    }

    User.findByIdAndUpdate(request.params.id, user, {new: true})
        .then(updatedUser => {
            response.json(updatedUser)
        })
        .catch(error => next(error))
})

app.delete('/api/users/:id', (request, response, next) => {
    const id = request.params.id

    User.findByIdAndDelete(id)
        .then(result => {
            if (result) {
                console.log(`User with the id: ${id} deleted`)
                response.status(204).end()
            } else {
                response.status(404).json({error: 'User not found'})
            }
        })
        .catch(error => {
            console.log(`Error deleting user with the id: ${id}:`, error)
            next(error)
        })
})


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})