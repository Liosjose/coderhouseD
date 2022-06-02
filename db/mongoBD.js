import mongoose from 'mongoose';

async function connect(){ 
     try{
     const url = "mongodb+srv://coder:ssfFoa0vOLkv7dnG@cluster0.zp4m1.mongodb.net/?retryWrites=true&w=majority"
     let rta = await mongoose.connect(url)
     console.log('Conectado a base de datos')
 }catch(error){ 
     console.log(`Ha Ocurrido un Error en la conexion ${error} `)
 }
 }



export{connect}