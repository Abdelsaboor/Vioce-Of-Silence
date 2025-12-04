import express from "express"
import mongoose from "mongoose"

 async function checkConnection() {
         try { 
            await mongoose.connect("mongodb://localhost:27017/VoiceOfSilence") ; 
            console.log("Connected to DB <3............") ; 
         }catch  (err)  {  
            console.log("Error connecting to DB"  ,  err.message) ; 
         }
}


export default  checkConnection