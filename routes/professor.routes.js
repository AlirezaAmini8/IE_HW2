import controller from '../controller/professor.controller.js'
import { authJWT } from '../middlewares/index.js'

export default function buildProffesorRoutes(route) {
    route.post('/admin/Professor', controller.add_Professor)
    route.put('/admin/Professor/:id',[authJWT.verifyToken] ,controller.update_Professor)
    route.delete('/admin/Professor/:id',[authJWT.verifyToken], controller.delete_Professor)
    route.get('/admin/Professors',[authJWT.verifyToken], controller.find_Professors)
    route.get('/admin/Professor/:id',[authJWT.verifyToken], controller.find_Professor_by_id)
}