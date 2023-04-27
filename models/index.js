import config from '../config/db.config.js'
import mongoose from 'mongoose'
import User from './db.model.js'

const db ={}
db.mongoose = mongoose
db.url = config.uri
db.users = User(mongoose)

export default db