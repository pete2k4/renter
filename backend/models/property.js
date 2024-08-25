const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connectig properties to ', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const propertySchema = new mongoose.Schema({
  name: String,
  adress: String,
}, {collection : "properties"})

propertySchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Property', propertySchema)
