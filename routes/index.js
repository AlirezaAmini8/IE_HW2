import express from 'express'
import buildProffesorRoutes from './professor.routes.js'

var route = express.Router()

buildProffesorRoutes(route)


export default route