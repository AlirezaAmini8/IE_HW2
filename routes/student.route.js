import controller from '../controller/student.controller.js'
import { authJWT } from '../middlewares/index.js'
import db from '../models/index.js'


export default function buildStudentRoutes(route) {
    route.post('/admin/student',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.add_Student)
    route.put('/admin/student/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER,db.ROLES.STUDENT)] ,controller.update_Student)
    route.delete('/admin/student/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.delete_Student)
    route.get('/admin/students',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.find_Students)
    route.get('/admin/student/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.find_Student_by_id)
    route.get('/students',[authJWT.verifyRole(db.ROLES.EDUCATIONALMANAGER)], controller.find_Students)
    route.get('/student/:id',[authJWT.verifyRole(db.ROLES.EDUCATIONALMANAGER)], controller.find_Student_by_id)
}