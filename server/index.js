import express from 'express'
import cors from 'cors'
import {connectDatabase} from "./config/database.js";
import userRoutes from "./routes/users.js";
import questionRoutes from './routes/question.js'
import answerRoutes from './routes/answer.js'
import postRoutes from './routes/post.js'
import 'dotenv/config'
import cloudinary from 'cloudinary'

const app=express();

cloudinary.v2.config({ 
    cloud_name: 'dhxxb8jpz', 
    api_key: '861478288591641', 
    api_secret: 'N0BkxRZ8Wie9zho8wwrN0u29nFA',
    secure: true
  });

app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())

app.get('/',(req,res)=>{
    res.send("This is a api channel")
})
app.use('/api/user',userRoutes)
app.use('/api/question',questionRoutes)
app.use('/api/answer',answerRoutes)
app.use('/api/post',postRoutes)

const PORT= process.env.PORT || 8000
connectDatabase()
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})