import { request, response } from 'express';
import db from '../models/index.js'

const ApprovedCourse = db.approvedCourse
const TermCourse = db.termCourse

const find_Courses = async (request, response) => {
  try {
    const data = {};
    if(request.body.isTermCourse){
        data = await TermCourse.find({});
    }
    else{
        data = await ApprovedCourse.find({});
    }
    response.status(200).send(data);
    
  } catch (err) {
    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
  }
}


export default { find_Courses}
