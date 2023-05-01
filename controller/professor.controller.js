import { request, response } from 'express';
import db from '../models/index.js'

const Professors = db.professors

const add_Professor = async (request, response) => {
  try {
    const professor = new Professors(request.body)
    const data = await professor.save();
    response.status(201).send(data);

  } catch (err) {
    response.status(500).send({
      message:
        err.message || "Some error occurred while creating the Professor."
    });
  }
}

const update_Professor =  async (request, response) => {
  
  const updates = Object.keys(request.body)
  const allowedUpdates = Object.keys(Professors.schema.tree)
  const isValidUpdate = updates.every((update) => allowedUpdates.includes(update))

  if (!isValidUpdate) {
    return response.status(400).send({ error: 'Invalid parameters for update' })
  }

  try {
    const id = request.params.id
    const data = await Professors.findByIdAndUpdate(id,request.body)
    
    if(!data) {
      response.status(404).send({
        message: `Cannot update Professor with id=${id}. Maybe Professor was not found!`
    }
    )}
    else{
      response.status(200).send(`Updated successfully.`)
    }
  }
  catch (error) {
    response.status(500).send(error)
  }
}

const delete_Professor = async (request, response) => {
  try {
    const id = request.params.id;
    const data = await Professors.findByIdAndRemove(id);

    if (!data) {
      response.status(404).send({
        message: `Cannot delete Professor with id=${id}. Maybe Professor was not found!`
      });
    } else {
      response.status(200).send({
        message: "Professor was deleted successfully!"
      });
    }
  } catch (err) {
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
  try {
    const id = request.params.id;
    const data = await Professors.findById(id);

    if (!data) {
      response.status(404).send({
        message: `Cannot find Professor with id=${id}.`
      });
    } else {
      response.status(200).send(data);
    }
  } catch (err) {
    response.status(500).send({
      message: `Server can't fulfill the request.`
    });
  }
}
export default { add_Professor, update_Professor , delete_Professor, find_Professors, find_Professor_by_id}
