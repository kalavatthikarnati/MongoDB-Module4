const ex = require('express')
const app = ex()
const mongoose = require('mongoose');
const port = 3000

app.use(ex.json())
app.use(ex.urlencoded({extended:true}))


app.get('/abot', (req,res)=>{
    res.send('about page')
})

mongoose.connect(`mongodb://127.0.0.1:27017/StudentDetails`).then(()=>{
    console.log('Database connected Successfully')
}).catch((e)=>console.log('error connecting database', e))

//Insert Data
 
     let studSchema = new mongoose.Schema(
      {
    
        name: {type:String},
        email : {type:String},
        age:{type:Number}

      }
       )
       let studmodel =mongoose.model("studentData", studSchema)

        app.post('/addstd', async (req, res) => {
    try {
        const newstud = new studmodel({
            name: req.body.name,
            age: req.body.age,
            email: req.body.email,
        });

        console.log(newstud);

        await newstud.save();

        res.status(201).json({ message: 'Data saved successfully', data: newstud });
    } catch (err) {
        console.error('Error saving student:', err);
        res.status(500).json({ message: 'Failed to save data', error: err.message });
    }
});

        //get all users from mongodb compass
        app.get('/getallstu', async(req,res)=>{
            const studentData = await studmodel.find({})
            
            res.json({"message": "data success!","data":studentData})
        })
           
        //update the data
        {/*
        app.put('/updatestu/:id',async(req,res)=>{
            let founduser = await studmodel.findByIdAndUpdate(req.params.id,
                {name:req.body.name,email:req.body.email,age:req.body.age})
            console.log(founduser);
             res.json({"message":"updatedsuccess!","data":founduser})
            
        })*/}
             //updated data
        app.put('/updatestu/:id', async (req, res) => {
    try {
        let founduser = await studmodel.findByIdAndUpdate(
            req.params.id,
            { name: req.body.name, email: req.body.email, age: req.body.age },
            { new: true }
        );
        if (!founduser) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log(founduser);
        res.json({ message: "updatedsuccess!", data: founduser });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Something went wrong", error: err.message });
    }
});
      //Delete user data
      
     app.delete('/delstud/:id',async(req, res)=>{
    
        let deluser =await studmodel.findByIdAndDelete(req.params.id);
            
        res.json({"message":"Data Deleted Succesfully","data":deluser})
    
        })
        {/*
        app.delete('/delstud/:id', async (req, res) => {
    try {
        const id = req.params.id;

        // Check if ID is a valid MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: "Invalid ID format" });
        }

        const deluser = await studmodel.findByIdAndDelete(id);

        if (!deluser) {
            return res.status(404).json({ message: "No student found with this ID" });
        }

        res.json({ message: "Data deleted successfully", data: deluser });
    } catch (err) {
        console.error("Error deleting student:", err);
        res.status(500).json({ message: "Failed to delete data", error: err.message });
    }
});*/}

        

app.listen(port, ()=>{
    console.log(`server started running at port: ${port}`)
})