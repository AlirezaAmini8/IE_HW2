import config from '../config/db.config.js'
import mongoose from 'mongoose'
import {User,Student, Professor, EducationalManager, ITManager, approvedCourse, termCourse} from './db.model.js'

const db ={}
db.mongoose = mongoose
db.url = config.uri
db.users = User
db.students = Student
db.professors = Professor
db.educationalManager = EducationalManager
db.ITManager = ITManager
db.approvedCourse = approvedCourse
db.termCourse = termCourse

export default db