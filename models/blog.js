const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
    title: {
      type: String,
      required: function() {return this.url == null }
    },
    author: String,
    url: {
      type: String,
      required: function() { return this.title == null}
    },
    likes: {
      type: Number,
      default:0
    },
    // required: () => { return this.url !== null || this.title !== null }
  })
  
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
