import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';

const signup = async(request, response) => {
    const {username, password, email} = request.body

    if(!username || !password || !email){
        return response.status(400).send({ error: 'We need password,username and email to create user.' })
    }
    try{
        var hashedPassword = bcrypt.hashSync(password, 10);
        const user = await db.users.create({
            id : username,
            email : email,
            password : hashedPassword
          });
        // create a token
        var token = jwt.sign({ id: user.id }, db.secret, {
            expiresIn: 86400 // expires in 24 hours
        });
        response.status(201).send({ auth: true, token: token })
    }
    catch(err){
        return response.status(500).send("There was a problem registering the user.")
    }
    
}
const login = async (request, response) => {
    const { username, password } = request.body;
    
    try {
        if (!username || !password) {
            return response.status(400).send('username and password are require');
        }
        const user = await db.users.findOne({id: username});

        if (!user) {
            return response.status(404).send('User not found.');
        }
        
        var passwordIsValid = await bcrypt.compareSync(password, user.password);
        if(!passwordIsValid){
            return response.status(400).send('Password is invalid');
        }
        const tokenPayload = {
           username : user.id,
        };
        const accessToken = jwt.sign(tokenPayload, db.secret);

        response.status(200).send({
            id: user._id,
            username: user.id,
            email:user.email,

        });
    } catch (err) {
        response.status(500).send({
            message:err.message
        });
    }
}

export default{signup, login}
