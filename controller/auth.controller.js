import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';

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
           role:user.__t 
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

export default{ login}
