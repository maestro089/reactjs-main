const express = require('express')
const app = express()
const authRouter = require('./routes/auth')
const cors = require('cors')

// говорим серверу чтобы воспринимал json
app.use(express.json({extended:true}))

// используем наш роутер 
app.use('/api/auth/',authRouter)

const PORT = 9999
function StartServer(){
    try{
       
        // вызов запуска сервера
        app.listen(PORT,()=>{
            console.log('Server started on port: ',PORT)
        })
    }catch(e){
        Console.log("Server start error: ",e.message)
    }
}
StartServer();