import { request, response } from 'express';
import db from '../models/index.js';
import bcrypt from 'bcryptjs';

const Students = db.students;

const add_Student = async (request, response) => {
  const {username, password, email} = request.body;

    if(!username || !password || !email){
        return response.status(400).send({ error: 'We need password,username and email to create student.' });
    }
    try{
        var hashedPassword = bcrypt.hashSync(password, 10);
        request.body.password = hashedPassword;
        const student = await Students.create(
            request.body
          );
        
        response.status(201).send(student);
    }
    catch(err){
      if (err.name === 'MongoServerError' && err.code === 11000){
        return response.status(400).send({
          message: `Username already taken.`
        });
      }
        return response.status(500).send("There was a problem registering the student.");
    }
}

const update_Student =  async (request, response) => {
  
  const updates = Object.keys(request.body);
  const allowedUpdates = Object.keys(Students.schema.tree);
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
  const id = request.params.id;

  if (!isValidUpdate) {
    return response.status(400).send({ error: 'Invalid parameters for update' });
  }

  try {  
    if(request.roleType == db.ROLES.ITMANAGER || (request.roleType == db.ROLES.STUDENT && request.userId == id)){
        const student = await Students.findByIdAndUpdate(id,request.body);
        response.status(200).send(student);
    }
    else{
        response.status(403).send(`You can't update other students information.`);
    }
  }
  catch (error) {
    if (err.name === 'MongoServerError' && err.code === 11000){
      return response.status(400).send({
        message: `Username already taken.`
      });
    }
    if(error.kind === 'ObjectId' ) {
      return response.status(404).send({
        message: `Cannot update student with id=${id}. Maybe student was not found!`
      });
    }
    
    response.status(500).send(error);
  }
}

const delete_Student = async (request, response) => {
  const id = request.params.id;
  
  try {  
    const student = await Students.findByIdAndRemove(id);
    response.status(200).send({student,
    message: "Student was deleted successfully!"
    });
    
  } catch (err) {
    if(err.kind === 'ObjectId'){
        return response.status(404).send({
          message: `Cannot delete student with id=${id}. Maybe student was not found!`
        });
    }
    response.status(500).send({
      message: `Could not delete student with id=${id}`
    });
  }
}

const find_Students = async (request, response) => {
  try {
    const data = await Students.find({});
    response.status(200).send(data);
    
  } catch (err) {
    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
  }
}

const find_Student_by_id = async (request, response) => {
  const id = request.params.id;
  try {  
    const data = await Students.findById(id);
    response.status(200).send(data);
    
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return response.status(404).send({
        message: `Cannot find student with id=${id}.`
      });
    }

    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
    
  }
}
export default { add_Student, update_Student , delete_Student, find_Students, find_Student_by_id};
