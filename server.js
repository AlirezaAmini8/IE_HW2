import 'dotenv/config';
import express from 'express';
import db from './models/index.js';
import route from './routes/index.js';
import morgan from 'morgan';
import fs from 'fs';

const app = express();

db.mongoose.connect(db.url).then(()=>{
    console.log('Connected to database')
}).catch(err =>{
    console.log(err.message)
})

app.use(express.json())

// create a write stream (in append mode)
var accessLogStream = fs.createWriteStream('RequestLogs.txt', { flags: 'a' })

// setup the logger
app.use(morgan('common', { stream: accessLogStream }))


app.use(route)

const PORT = process.env.port || 3000

app.listen(PORT,()=>{
    console.log(`listening on port ${PORT}`)
})