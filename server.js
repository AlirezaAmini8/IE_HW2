import 'dotenv/config';
import express from 'express';
import db from './models/index.js';

const app = express();

db.mongoose.connect(db.url).then(()=>{
    console.log('Connected to database')
}).catch(err =>{
    console.log(err.message)
})
