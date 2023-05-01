import controller from '../controller/professor.controller.js'

export default function buildProffesorRoutes(route) {
    route.post('/admin/Professor', controller.add_Professor)
    route.put('/admin/Professor/:id', controller.update_Professor)
    route.delete('/admin/Professor/:id', controller.delete_Professor)
    route.get('/admin/Professors', controller.find_Professors)
    route.get('/admin/Professor/:id', controller.find_Professor_by_id)
}