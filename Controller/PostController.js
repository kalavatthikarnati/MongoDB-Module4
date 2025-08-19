
const Post = require('../Model/PostModel.js');

 //get all users from mongodb Atlas
       const getData = async(req,res)=>{
            const getData = await Post.find({})
            
            res.json({"message": "data success!","data":getData})
        };
        //Add new Data
        const postData= async (req, res) => {
    try {
        const newpost = new Post({
             title: req.body.title,
            content: req.body.content,

        });

        console.log(newpost);

        await newpost.save();

        res.status(201).json({ message: 'Data saved successfully', data: newpost });
    } catch (err) {
        console.error('Error saving student:', err);
        res.status(500).json({ message: 'Failed to save data', error: err.message });
    }
};
  

   //updated data
        const updatedata = async (req, res) => {
    try {
        const founduser = await Post.findByIdAndUpdate(
            req.params.id,
            {title: req.body.title, content: req.body.content},
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
};
///delete data
       const deluser =async(req, res)=>{
    
        let deluser =await Post.findByIdAndDelete(req.params.id);
            
        res.json({"message":"Data Deleted Succesfully","data":deluser})
    
        };

        module.exports = {getData,postData,deluser,updatedata}