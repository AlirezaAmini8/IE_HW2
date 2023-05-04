import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models';

const signup = async(request, response) => {
    
    try{
        var hashedPassword = bcrypt.hashSync(request.body.password, 10);
        const user = await db.users.create({
            id : request.body.username,
            email : request.body.email,
            password : hashedPassword
          });
        // create a token
        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        response.status(201).send({ auth: true, token: token })
    }
    catch(err){
        return response.status(500).send("There was a problem registering the user.")
    }
    
}
export {signup}
