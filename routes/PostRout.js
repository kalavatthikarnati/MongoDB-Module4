const express = require('express');
const postrouter = express.Router();


const{getData,postData,deluser,updatedata}=require('../Controller/PostController')

// Routes
 postrouter.get('/getapost',getData);
postrouter.post('/addPosts', postData);

postrouter.patch('/updatepost/:id', updatedata);
postrouter.delete('/delpost/:id', deluser);

module.exports = postrouter;