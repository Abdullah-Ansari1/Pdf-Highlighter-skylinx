const mongoose = require('mongoose');

const CONNECTION_URL = 'mongodb://localhost:27017/pdfDatabase?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false';

mongoose.connect(CONNECTION_URL).then(()=>{
    console.log("connection is success");
}).catch((e)=>{
    console.log("no connection");
})