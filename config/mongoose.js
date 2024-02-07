const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/NewAPI');

const db = mongoose.connection;

db.once('open',async (err)=>{
    if(err)
    {
        console.log("DB not connected");
    }
    else 
    {
        console.log("DB connected");
    }
})

module.exports = db;