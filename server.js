import express from "express"
import mongoose from "mongoose";
import bodyParser from "express";
import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';
import { config } from "dotenv";




const app = express();

app.use(bodyParser.json())

// .env setup
config({path:'.env'})

//user Router
app.use('/api/user', userRouter);

// contact router
app.use('/api/contact', contactRouter);


//Home route
app.get('/', (req, res) => {
    res.json({message:'This is home route working'})
})








//Connecting mongodb
mongoose.connect(process.env.MONGO_URI, {
    dbName: "Node_Js_Mastery_Course"
}).then(() => console.log("MongoDb Connected..!")).catch((err) => console.log(err));

const port = process.env.PORT;
app.listen(port, () => console.log(`server is running on port ${port}`));
