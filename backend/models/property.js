const mongoose = require('mongoose')

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
