import { request, response } from 'express';
import db from '../models/index.js';

const ApprovedCourse = db.approvedCourse;
const TermCourse = db.termCourse;

const add_Course = async (request, response) => {
    try{
        (request.body.isTermCourse == true)? await TermCourse.create(): await ApprovedCourse.create();
        response.status(201).send(`Course created successfully.`);
      }
      catch(err){
          return response.status(500).send("There was a problem creating the course.");
      }
}
const update_Course =  async (request, response) => {
    const updates = Object.keys(request.body);
    const id = request.params.id;
    const allowedUpdates = (request.body.isTermCourse == true) ? Object.keys(TermCourse.schema.tree): Object.keys(ApprovedCourse.schema.tree);
    const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidUpdate) {
        return response.status(400).send({ error: 'Invalid parameters for update' });
    }

    try {  
      (request.body.isTermCourse == true) ? await TermCourse.findByIdAndUpdate(id,request.body): await ApprovedCourse.findByIdAndUpdate(id,request.body);
      response.status(200).send(`Updated successfully.`);
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
        (request.body.isTermCourse == true) ? await TermCourse.findByIdAndRemove(id) : await ApprovedCourse.findByIdAndRemove(id);
        response.status(200).send({
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
    const data = {};
    if(request.roleType == db.ROLES.STUDENT || request.roleType == db.ROLES.PROFESSOR){
        data = (request.body.isTermCourse == true)? await TermCourse.find({field:request.body.field}).populate(["prerequisite","requirement","teacher"]) : await ApprovedCourse.find({field:request.body.field}).populate(["prerequisite","requirement"]);
    }else{
        data = (request.body.isTermCourse == true)? await TermCourse.find({}).populate(["prerequisite","requirement","teacher"]) : await ApprovedCourse.find({}).populate(["prerequisite","requirement"]);
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
        const data = {};
        if(request.roleType == db.ROLES.STUDENT || request.roleType == db.ROLES.PROFESSOR){
            data = (request.body.isTermCourse == true) ? await TermCourse.findById(id).populate(["prerequisite","requirement","teacher"]) : await ApprovedCourse.findById(id).populate(["prerequisite","requirement"]);
            if(data.field != request.body.field){
                return response.status(403).send({message: 'You can not access other fields course.'});
            }
        }else{
            data = (request.body.isTermCourse == true) ? await TermCourse.findById(id).populate(["prerequisite","requirement","teacher"]) : await ApprovedCourse.findById(id).populate(["prerequisite","requirement"]);
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
