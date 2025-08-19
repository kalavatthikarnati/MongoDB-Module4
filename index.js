const express = require('express')
const app = express()
var dbconnect  = require("./db.js")
const postRoutes = require('./routes/PostRout.js');
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended:true}))

dbconnect();


app.use('/api/post', postRoutes);

     


        

app.listen(port, ()=>{
   console.log(`server started running at port: ${port}`);

})