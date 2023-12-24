import express from "express";
import dotenv from "dotenv";
import ConnectDB from "./database/connection";

dotenv.config();

const zomato = express();
zomato.use(express.json());



zomato.get('/', (req, res) => {
  
  res.json({
    message:"server is running",
  })
});






//Connection to port
zomato.listen(4000, () => {
  ConnectDB()
    .then(()=>{
      console.log("Server is running !!!")
    })
    .catch((err)=>{
      console.log("server is running but DB is not established");
      console,log(err);
    })
});