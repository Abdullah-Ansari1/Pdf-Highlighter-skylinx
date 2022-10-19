const express = require("express");
const cors = require("cors");
const router = require("./routers/pdf");
require("./db/conn");

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// const corsOpts = {
//     origin: '*',
//     credentials: true,
//     methods: ['GET','POST','HEAD','PUT','PATCH','DELETE'],
// };
// app.use(cors(corsOpts));

// MUBASHER
// IMPLEMENTING CORS SO THAT OTHER WEBSITES CAN USE OUR API
app.use(cors()); // THIS WILL WORK FOR SIMPLE REQUESTS LIKE (GET AND POST) BUT NOT FOR (PATCH, DELETE or PUT). or for cookies

// FOR NON-SIMPLE REQUEST WE USE app.options request.
app.options("*", cors()); // app.options() is just like app.get or post etc.

app.use((req,res,next) => {
    console.log("ROUTE:",req.path, req.baseUrl)
    next()
})

const port = process.env.PORT || 4000;
app.use("/pdf",router);


app.listen(port, ()=>{
    console.log(`connectioon is listing on port:${port}`)
})