import { request, response } from 'express';
import db from '../models/index.js';

const ApprovedCourse = db.approvedCourse;
const TermCourse = db.termCourse;

const add_Course = async (request, response) => {
    try{
        let course = (request.body.isTermCourse == true)? await TermCourse.create(request.body): await ApprovedCourse.create(request.body);
        response.status(201).send(course);
      }
      catch(err){
        console.log(err)
          return response.status(500).send("There was a problem creating the course.");
      }
}
const update_Course =  async (request, response) => {
    const updates = Object.keys(request.body);
    const id = request.params.id;
    let allowedUpdates = (Boolean(request.query.isTermCourse) == true) ? Object.keys(TermCourse.schema.tree): Object.keys(ApprovedCourse.schema.tree);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return response.status(400).send({ error: 'Invalid parameters for update' });
    }

    try {  
      let course = (Boolean(request.query.isTermCourse) == true) ? await TermCourse.findByIdAndUpdate(id,request.body): await ApprovedCourse.findByIdAndUpdate(id,request.body);
      response.status(200).send(course);
    }
    catch (error) {
      if(error.kind === 'ObjectId' ) {
        return response.status(404).send({
          message: `Cannot update course with id=${id}. Maybe course was not found!`
        });
      }
      
      response.status(500).send(error);
    }
}
const delete_Course = async (request, response) => {
    const id = request.params.id;
    
    try {  
        let course = (Boolean(request.query.isTermCourse) == true) ? await TermCourse.findByIdAndRemove(id) : await ApprovedCourse.findByIdAndRemove(id);
        response.status(200).send({course ,
        message: "Course was deleted successfully!"
        });
      
    } catch (err) {
      if(err.kind === 'ObjectId'){
          return response.status(404).send({
            message: `Cannot delete course with id=${id}. Maybe course was not found!`
          });
      }
      response.status(500).send({
        message: `Could not delete course with id=${id}`
      });
    }
}
const find_Courses = async (request, response) => {
  try {
    let data = {};
    if(request.roleType == db.ROLES.STUDENT || request.roleType == db.ROLES.PROFESSOR){
        data = await ApprovedCourse.find({field:request.body.field}).populate(["prerequisite","requirement","teacher"]);
    }else{
        data = await ApprovedCourse.find({}).populate(["prerequisite","requirement","teacher"]);
    }
    response.status(200).send(data);
    
  } catch (err) {
    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
  }
}
const find_Course_by_id = async (request, response) => {
    const id = request.params.id;

    try {
        let data = {};
        if(request.roleType == db.ROLES.STUDENT || request.roleType == db.ROLES.PROFESSOR){
            data =  await ApprovedCourse.findById(id).populate(["prerequisite","requirement","teacher"]);
            if(data.field != request.body.field){
                return response.status(403).send({message: 'You can not access other fields course.'});
            }
        }else{
            data = await ApprovedCourse.findById(id).populate(["prerequisite","requirement","teacher"]);
        }
        response.status(200).send(data);
      
    } catch (err) {
        if (err.kind === 'ObjectId') {
            return response.status(404).send({
                message: `Cannot find course with id=${id}.`
            });
        }
  
        response.status(500).send({
            message: `Server can't fulfill the request.`
        });
    }
}

export default { add_Course, find_Courses, update_Course, delete_Course, find_Course_by_id};
