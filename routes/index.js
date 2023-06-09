import express from 'express';
import buildProffesorRoutes from './professor.routes.js';
import buildStudentRoutes from './student.route.js';
import buildEducationalManagerRoutes from './educationalmanager.routes.js';
import buildCourseRoutes from './course.route.js';
import buildLoginRoutes from './auth.routes.js';

var route = express.Router();

buildProffesorRoutes(route);
buildStudentRoutes(route);
buildEducationalManagerRoutes(route);
buildCourseRoutes(route);
buildLoginRoutes(route);

export default route;