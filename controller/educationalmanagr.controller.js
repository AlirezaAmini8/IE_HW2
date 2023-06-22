import { request, response } from 'express';
import db from '../models/index.js';
import bcrypt from 'bcryptjs';

const EducationalManager = db.educationalManager;

const add_EducationalManager = async (request, response) => {
  const {username, password, email} = request.body;

    if(!username || !password || !email){
        return response.status(400).send({ error: 'We need password,username and email to create educational manager.' });
    }
    try{
        var hashedPassword = bcrypt.hashSync(password, 10);
        request.body.password = hashedPassword;
        const educationalManager = await EducationalManager.create(
            request.body
          );
        
        response.status(201).send(educationalManager);
    }
    catch(err){
      if (err.name === 'MongoServerError' && err.code === 11000){
        return response.status(400).send({
          message: `Username already taken.`
        });
      }
        return response.status(500).send("There was a problem registering the educational manager.");
    }
}

const update_EducationalManager =  async (request, response) => {
  
  const updates = Object.keys(request.body);
  const allowedUpdates = Object.keys(EducationalManager.schema.tree);
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update));
  const id = request.params.id;

  if (!isValidUpdate) {
    return response.status(400).send({ error: 'Invalid parameters for update' });
  }

  try {  
    const educationalManager = await EducationalManager.findByIdAndUpdate(id,request.body);
    response.status(200).send(educationalManager);
  }
  catch (error) {
    if(error.kind === 'ObjectId' ) {
      return response.status(404).send({
        message: `Cannot update educational manager with id=${id}. Maybe educational manager was not found!`
      });
    }
    
    response.status(500).send(error);
  }
}

const delete_EducationalManager = async (request, response) => {
  const id = request.params.id;
  
  try {  
    const educationalManager = await EducationalManager.findByIdAndRemove(id);
    response.status(200).send({educationalManager ,
    message: "Educational manager was deleted successfully!"
    });
    
  } catch (err) {
    if(err.kind === 'ObjectId'){
        return response.status(404).send({
          message: `Cannot delete educational manager with id=${id}. Maybe educational manager was not found!`
        });
    }
    response.status(500).send({
      message: `Could not delete educational manager with id=${id}`
    });
  }
}

const find_EducationalManagers = async (request, response) => {
  try {
    const data = await EducationalManager.find({});
    response.status(200).send(data);
    
  } catch (err) {
    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
  }
}

const find_EducationalManager_by_id = async (request, response) => {
  const id = request.params.id;
  try {  
    const data = await EducationalManager.findById(id);
    response.status(200).send(data);
    
  } catch (err) {
    if (err.kind === 'ObjectId') {
      return response.status(404).send({
        message: `Cannot find educational manager with id=${id}.`
      });
    }

    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
    
  }
}
export default { add_EducationalManager, update_EducationalManager , delete_EducationalManager, find_EducationalManagers, find_EducationalManager_by_id};
