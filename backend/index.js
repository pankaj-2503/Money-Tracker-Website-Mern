const express=require("express");
const cors=require("cors");
const app=express();
const port=process.env.PORT || 4000;
const Transaction=require('./models/transaction.model.js');
const mongoose=require("mongoose");
require('dotenv').config();

const pass=process.env.MONGO_PASSWORD;
const user=process.env.MONGO_USER;

const url=`mongodb+srv://${user}:${pass}@cluster2.0j3p7xl.mongodb.net`


app.use(express.json());
app.use(cors());

//for testing
app.get('/api/test',(req,res)=>{
    res.json("Test ok!")
})

//to post transaction on backend then store into database
app.post('/api/transaction',async (req,res)=>{
    const {price,name,description,datetime}=req.body;
    
    await mongoose.connect(url);
    const transaction = await Transaction.create({price,name,description,datetime});
    res.json(transaction);
})

//for displaying on frontend from database
app.get('/api/transactions',async (req,res)=>{
    await mongoose.connect(url);
    const transactions = await Transaction.find();
    res.json(transactions);
})

//global catch
app.use((err,req,res,next)=>{
    if(err) res.send(err);
    next();
})


app.listen(port,()=>{
    console.log(`App is listening at port ${port}`);
})