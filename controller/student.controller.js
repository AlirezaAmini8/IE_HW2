import { request, response } from 'express';
import db from '../models/index.js'

const Students = db.students

const add_Student = async (request, response) => {
  const {username, password, email} = request.body

    if(!username || !password || !email){
        return response.status(400).send({ error: 'We need password,username and email to create student.' })
    }
    try{
        var hashedPassword = bcrypt.hashSync(password, 10);
        const student = await Students.create({
            id : username,
            email : email,
            password : hashedPassword
          });
        
        response.status(201).send(`Student created with id=${student.id} successfully.`)
    }
    catch(err){
        return response.status(500).send("There was a problem registering the student.")
    }
}

const update_Student =  async (request, response) => {
  
  const updates = Object.keys(request.body)
  const allowedUpdates = Object.keys(Students.schema.tree)
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))
  const id = request.params.id

  if (!isValidUpdate) {
    return response.status(400).send({ error: 'Invalid parameters for update' })
  }

  try {  
    await Students.findByIdAndUpdate(id,request.body)
    response.status(200).send(`Updated successfully.`)
  }
  catch (error) {
    if(error.kind === 'ObjectId' ) {
      return response.status(404).send({
        message: `Cannot update student with id=${id}. Maybe student was not found!`
      })
    }
    
    response.status(500).send(error)    
  }
}

const delete_Student = async (request, response) => {
  const id = request.params.id;
  
  try {  
    await Students.findByIdAndRemove(id);
    response.status(200).send({
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
    await Students.findById(id);
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
export default { add_Student, update_Student , delete_Student, find_Students, find_Student_by_id}
