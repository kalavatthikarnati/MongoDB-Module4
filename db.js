const mongoose = require('mongoose');

const dbconnect = () => {
  mongoose.connect('mongodb+srv://mvcdatabase:mvcdatabase@cluster0.rlksgly.mongodb.net/MVCpractice?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => {
      console.log('Database connected Successfully');
    })
    .catch((e) => console.log('error connecting database', e));
};

module.exports = dbconnect;
