import mongoose from 'mongoose'

export const connectDatabase = ()=>{
    const connectk=process.env.CONNECTION_URL
    
    mongoose.connect(connectk, { useNewUrlParser: true, useUnifiedTopology: true }) //Mongodb URI is fetched from environment variable
        .then( (c) => console.log( `Database Connected ${c.connection.name}` ))
        .catch((e)=>console.log(e))
}