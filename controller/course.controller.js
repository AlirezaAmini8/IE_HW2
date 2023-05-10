import { request, response } from 'express';
import db from '../models/index.js'

const ApprovedCourse = db.approvedCourse
const TermCourse = db.termCourse

const find_Courses = async (request, response) => {
  try {
    const approvedData = await ApprovedCourse.find({});
    const termData = await TermCourse.find({});
    response.status(200).send( {
        "approved Courses": approvedData,
        "term Courses": termData
    });
    
  } catch (err) {
    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
  }
}


export default { find_Courses}
