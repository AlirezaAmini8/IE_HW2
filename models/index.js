import config from '../config/db.config.js'
import mongoose from 'mongoose'
import {User,Student} from './db.model.js'

const db ={}
db.mongoose = mongoose
db.url = config.uri
db.users = User(mongoose)
db.students = Student(mongoose)

export default db