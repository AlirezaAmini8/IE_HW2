import express from 'express'
import buildProffesorRoutes from './professor.routes.js'
import buildStudentRoutes from './student.route.js'

var route = express.Router()

buildProffesorRoutes(route)
buildStudentRoutes(route)

export default route