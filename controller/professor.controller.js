import { request, response } from 'express';
import db from '../models/index.js';
import bcrypt from 'bcryptjs';

const Professors = db.professors;

const add_Professor = async (request, response) => {
  const {username, password, email} = request.body;
    if(!username || !password || !email){
        return response.status(400).send({ error: 'We need password,username and email to create professor.' });
    }
    try{
        var hashedPassword = bcrypt.hashSync(password, 10);
        request.body.password = hashedPassword;
        await Professors.create(
            request.body
          );
        response.status(201).send(`Professor created with id=${username} successfully.`);
    }
    catch(err){
      
      if (err.name === 'MongoServerError' && err.code === 11000){
        return response.status(400).send({
          message: `Username already taken.`
        });
      }
      return response.status(500).send("There was a problem registering the professor.");
    }
}

const update_Professor =  async (request, response) => {
  
  const updates = Object.keys(request.body);
  const allowedUpdates = Object.keys(Professors.schema.tree);
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
  const id = request.params.id;

  if (!isValidUpdate) {
    return response.status(400).send({ error: 'Invalid parameters for update' });
  }

  try {  
    if(request.roleType == db.ROLES.ITMANAGER || (request.roleType == db.ROLES.PROFESSOR && request.userId == id)){
      await Professors.findByIdAndUpdate(id,request.body);
      response.status(200).send(`Updated successfully.`);
    }
    else{
      response.status(403).send(`You can't update other professors information.`);
    }
  }
  catch (error) {
    if (error.name === 'MongoServerError' && error.code === 11000){
      return response.status(400).send({
        message: `Username already taken.`
      });
    }
    if(error.kind === 'ObjectId' ) {
      return response.status(404).send({
        message: `Cannot update Professor with id=${id}. Maybe Professor was not found!`
      });
    }
    
    response.status(500).send(error);
  }
}

const delete_Professor = async (request, response) => {
  const id = request.params.id;
  
  try {  
    await Professors.findByIdAndRemove(id);
    response.status(200).send({
    message: "Professor was deleted successfully!"
    });
    
  } catch (err) {
    if(err.kind === 'ObjectId'){
        return response.status(404).send({
          message: `Cannot delete Professor with id=${id}. Maybe Professor was not found!`
        });
    }
    response.status(500).send({
      message: `Could not delete Professor with id=${id}`
    });
  }
}

const find_Professors = async (request, response) => {
  try {
    const data = await Professors.find({});
    response.status(200).send(data);
    
  } catch (err) {
    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
  }
}

const find_Professor_by_id = async (request, response) => {
  const id = request.params.id;
  try {  
    const data = await Professors.findById(id);
    response.status(200).send(data);
    
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return response.status(404).send({
        message: `Cannot find Professor with id=${id}.`
      });
    }

    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
    
  }
}
export default { add_Professor, update_Professor , delete_Professor, find_Professors, find_Professor_by_id};
