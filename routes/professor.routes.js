import controller from '../controller/professor.controller.js'
import { authJWT } from '../middlewares/index.js'
import db from '../models/index.js'


export default function buildProffesorRoutes(route) {
    route.post('/admin/Professor',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.add_Professor)
    route.put('/admin/Professor/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER)] ,controller.update_Professor)
    route.delete('/admin/Professor/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.delete_Professor)
    route.get('/admin/Professors',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.find_Professors)
    route.get('/admin/Professor/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.find_Professor_by_id)
}