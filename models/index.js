import config from '../config/db.config.js'
import mongoose from 'mongoose'

const db ={}
db.mongoose = mongoose
db.url = config.uri
db.users = User(mongoose)

export default db