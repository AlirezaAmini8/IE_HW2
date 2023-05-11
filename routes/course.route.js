import controller from '../controller/course.controller.js';
import { authJWT } from '../middlewares/index.js';
import db from '../models/index.js';


export default function buildCourseRoutes(route) {
    route.post('/course',[authJWT.verifyRole(db.ROLES.EDUCATIONALMANAGER)], controller.add_Course)
    route.put('/course/:id',[authJWT.verifyRole(db.ROLES.EDUCATIONALMANAGER)] ,controller.update_Course)
    route.delete('/course/:id',[authJWT.verifyRole(db.ROLES.EDUCATIONALMANAGER)], controller.delete_Course)
    route.get('/courses',[authJWT.verifyRole(db.ROLES.ITMANAGER,db.ROLES.EDUCATIONALMANAGER,db.ROLES.PROFESSOR,db.ROLES.STUDENT)], controller.find_Courses)
    route.get('/course/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER,db.ROLES.EDUCATIONALMANAGER,db.ROLES.PROFESSOR,db.ROLES.STUDENT)], controller.find_Course_by_id)
};