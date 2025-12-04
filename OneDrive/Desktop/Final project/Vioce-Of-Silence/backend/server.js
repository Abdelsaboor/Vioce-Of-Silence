import  express from  "express" 
import checkConnection from "./Config.js/db.js";
const app =  express() ; 
const port = 3000 ; 


checkConnection() ; 




app.listen(port , ()=>{ 
       console.log(`server is running at port ${port}` ) ; 
})

