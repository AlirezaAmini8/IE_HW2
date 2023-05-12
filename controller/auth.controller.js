import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import db from '../models/index.js';

const login = async (request, response) => {
    const { username, password } = request.body;
    
    try {
        if (!username || !password) {
            return response.status(400).send('username and password are require');
        };
        
        const user = await db.users.findOne({username: username});

        if (!user) {
            return response.status(404).send('User not found.');
        }
        
        var passwordIsValid = await bcrypt.compareSync(password, user.password);

        if(!passwordIsValid){
            return response.status(400).send('Password is invalid');
        }
        const tokenPayload = {
           id : user._id,
           role : user.__t
        };
        
        const token = jwt.sign(tokenPayload, db.secret);

        response.status(200).send({
            id: user._id,
            username: user.username,
            email:user.email,
            token: token
        });
    } catch (err) {
        response.status(500).send({
            message:err.message
        });
    }
}

export default{ login};
