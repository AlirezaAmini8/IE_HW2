import 'dotenv/config';
import express from 'express';
import db from './models/index.js';
import route from './routes/db.routes.js'

const app = express();

db.mongoose.connect(db.url).then(()=>{
    console.log('Connected to database')
}).catch(err =>{
    console.log(err.message)
})

app.use(express.json())

app.use(route)

const PORT = process.env.port || 3000

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})