import db from '../models/index.js';
import jwt from 'jsonwebtoken';

const verifyRole = (roles) => {
    return async (request, response) => {
      var token = request.headers['access-token'];
      if (!token) {
          return response.status(403).send({ auth: false, message: 'No token provided.' });
      }
      try{
        const decoded = await jwt.verify(token.split(' ')[1], db.secret);
        request.userId = decoded.id;
        if(roles.map((element) => element == decoded.role).includes(true)){
            request.roleType = decoded.role;
            return response.status(200).send({ auth: true, role: decoded.role, message: 'you could access.'});
        }
        else
            return response.status(403).send({  message: 'No permission' });
    }
    catch(err){
        return response.status(500).send({
            auth: false, message: 'Failed to authenticate token.' 
        });
    }
  }
};

const authJWT = {
    verifyRole
};
export {authJWT};