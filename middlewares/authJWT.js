import db from '../models/index.js';
import jwt from 'jsonwebtoken'

const verifyRole = (roles) => {
    return async (request, response, next) => {
      var token = request.headers['access-token'];
      if (!token) {
          return response.status(403).send({ auth: false, message: 'No token provided.' });
      }
      try{
        const decoded = await jwt.verify(token.split(' ')[1], db.secret);
        request.userId = decoded.id;
        if(roles.map((element) => element == decoded.role).includes(true))
            return next();
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

// const verifyTokenAndRole = async(request, response, next) => {
//     const middlewareFn = verifyRole(...roles);
//     await middlewareFn(request, response, next);
//   };

const authJWT = {
    // verifyTokenAndRole,
    verifyRole
};
export {authJWT}