import controller from '../controller/educationalmanagr.controller.js';
import { authJWT } from '../middlewares/index.js';
import db from '../models/index.js';


export default function buildEducationalManagerRoutes(route) {
    route.post('/admin/manager',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.add_EducationalManager)
    route.put('/admin/manager/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER)] ,controller.update_EducationalManager)
    route.delete('/admin/manager/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.delete_EducationalManager)
    route.get('/admin/managers',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.find_EducationalManagers)
    route.get('/admin/manager/:id',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.find_EducationalManager_by_id)
};