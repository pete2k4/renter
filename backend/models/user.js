const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: String,
  password: String,
}, {collection : "users"})

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next(); 
    try {
  
      const salt = await bcrypt.genSalt(10); 
      this.password = await bcrypt.hash(this.password, salt); 
      next();
  
    } catch (error) {
      next(error);
    }
  });

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('User', userSchema)
