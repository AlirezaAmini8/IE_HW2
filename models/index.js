import config from '../config/db.config.js';
import 'dotenv/config';
import mongoose from 'mongoose';
import {User,Student, Professor, EducationalManager, ITManager, approvedCourse, termCourse} from './db.model.js';

const db ={};
db.mongoose = mongoose;
db.url = config.uri;
db.secret = process.env.secret;
db.users = User;
db.students = Student;
db.professors = Professor;
db.educationalManager = EducationalManager;
db.ITManager = ITManager;
db.approvedCourse = approvedCourse;
db.termCourse = termCourse;

const Roles = {
	PROFESSOR: "Professor",
	STUDENT: "Student",
	EDUCATIONALMANAGER: "Educational Manager",
	ITMANAGER: "itmanager"
};

db.ROLES = Roles;

export default db;