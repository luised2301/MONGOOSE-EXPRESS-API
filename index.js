require('dotenv').config()
const mongoose = require("mongoose")
const express = require("express")
//App
const app = express()


//Middlewares (lo estamos declarando de manera global por el app.use)
app.use(express.json())
//Desestructurando la informacion de .env
const {
    DB_USERNAME,
    DB_PASSWORD,
    DBHOST,
    DB_NAME,    
}= process.env


//Schema -> Document (cada entrada es un documento)
const koderSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        minlength: 3,
        maxlength:20,
    },
    modulo:{
        type:String
    },
    edad:{
        type: Number,
        min: 18,
        max:150
    },
    generacion:{
        type:String,
        required:true
    },
    sexo:{
        type: String,
        enum: ["f", "m", "o"]
    }
})

// Modelos -> Collection
const Koder = mongoose.model("koders", koderSchema)

//Creando mi url de mongo
const URL = `mongodb+srv://${DB_USERNAME}:${DB_PASSWORD}@${DBHOST}${DB_NAME}`

//Conectamos a la url (esto es una promesa)
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


//Creamos un endpoint
app.post ("/koders", async (request, response)=>{
    //Desestructurando la request
    const {body}= request
    try{
        //Accedemos a la base de datos ->promesas
        const koder = await Koder.create(body)
        console.log("koder",koder)
        response.status(201)
        response.json({
            success:true,
            data:{koder}
        })
    }
    catch(error){
        console.log("error:",error)
        response.status(400)
        response.json({
            success:false,
            message: error.message
        })
    }

})

//Encontrar un koder por su id
//Usando Model.findByID


app.get ("/koders", async (request, response)=>{
    //Desestructurando la request
    const {query}=request
    console.log("user to find:",query.id)
    try{
        //Accedemos a la base de datos ->promesas
         const koder = await Koder.findById(query.id)
         if(!koder){
            console.log("koder not found")
            response.status(400)
            response.json({
             success:false,
             message: "no match found"
        })
        return
         }
         else
         console.log("koder",koder)
         response.status(201)
         response.json({
             success:true,
             data:{koder}
        })
    }
    catch(error){
        console.log("error:",error)
        response.status(400)
         response.json({
             success:false,
             message: error.message
        })
    }

})