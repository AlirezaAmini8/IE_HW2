import controller from '../controller/course.controller.js'
import { authJWT } from '../middlewares/index.js'
import db from '../models/index.js'


export default function buildCourseRoutes(route) {
    route.get('/admin/courses',[authJWT.verifyRole(db.ROLES.ITMANAGER)], controller.find_Courses)
}