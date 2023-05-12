import controller from '../controller/auth.controller.js';


export default function buildLoginRoutes(route) {
    route.post('/login', controller.login)
};