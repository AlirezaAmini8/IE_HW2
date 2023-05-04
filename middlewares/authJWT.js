import db from '../models/index.js';
import jwt from 'jsonwebtoken'

const verifyToken = async(request,response) => {
    var token = request.headers['access-token'];
    if (!token) {
        return response.status(403).send({ auth: false, message: 'No token provided.' });
    }
    try{
        const decoded = await jwt.verify(token, db.secret);
        request.userId = decoded.id;
        response.status(200).send(decoded);
    }
    catch(err){
        return res.status(500).send({
            auth: false, message: 'Failed to authenticate token.' 
        });
    }
}
const authJWT = {
    verifyToken
};
export {authJWT}