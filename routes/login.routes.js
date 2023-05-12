import controller from '../controller/auth.controller';
import db from '../models/index.js';


export default function buildLoginRoutes(route) {
    route.post('/login', controller.login)
};