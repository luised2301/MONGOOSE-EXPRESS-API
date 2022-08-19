require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")

const app = express()

const {
    DB_USERNAME,
    DB_PASSWORD,
    DBHOST,
    DB_NAME,    
}= process.env

const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DBHOST}${DB_NAME}`


console.log("process env", process.env)

mongoose.connect(URL)  
.then(()=>{
    console.log("conectado a la base de datos de mongo")
    app.listen(8080, ()=>{
        console.log("Server listening...")
    })

})
.catch((error)=>{
    console.log("error",error)
})