const mongoose = require('mongoose')
mongoose.set('strictQuery',false)

require('dotenv').config()

const url = process.env.MONGODB_URI

console.log('connectig to ', url)

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB')
    })
    .catch(error => {
        console.log('error connecting to MongoDB: ', error.message)
    })

const userSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
}, {collection : "users"})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)
