import config from '../config/db.config.js'
import mongoose from 'mongoose'
import {User,Student, Professor, EducationalManager, ITManager} from './db.model.js'

const db ={}
db.mongoose = mongoose
db.url = config.uri
db.users = User(mongoose)
db.students = Student(mongoose)
db.professors = Professor(mongoose)
db.educationalManager = EducationalManager(mongoose)
db.ITManager = ITManager(mongoose)

export default db