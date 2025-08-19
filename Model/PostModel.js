const mongoose = require('mongoose')
 const postSchema = new mongoose.Schema(
    { title: String, 
        
        content: String 
    });
     // Creating Model 
      const PostModel = mongoose.model('MVCdata', postSchema);
       module.exports = PostModel;