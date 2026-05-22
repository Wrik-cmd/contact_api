import { config } from "dotenv";
config({ path: ".env" });

import express from "express";
import mongoose from "mongoose";
import cors from "cors";

import userRouter from './Routes/user.js';
import contactRouter from './Routes/contact.js';




const app = express();

app.use(cors());
app.use(express.json())   //replaces bodyParser.json()

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


// global error handler (Express 4 needs this for thrown errors)
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ message: "Internal server error", success: false });
});



//Connecting mongodb
mongoose.connect(process.env.MONGO_URI, {
    dbName: "Node_Js_Mastery_Course"
}).then(() => console.log("MongoDb Connected..!")).catch((err) => console.log(err));

const port = process.env.PORT ||3000;
app.listen(port, () => console.log(`server is running on port ${port}`));
