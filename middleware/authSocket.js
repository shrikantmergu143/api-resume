const jwt = require("jsonwebtoken");

const config = process.env;

const verifyTokenSocket = (socket, next) =>{
    const token = socket?.handshake?.auth?.token;
    try{
        const decode = jwt.verify(token, config.TOKEN_KEY);
        socket.user = decode;
    }catch(err){
        const socketError = new Error("NOT_AUTHORIZED");
        return next(socketError);
    }
    next();
}
const validateToken = (socket, req) =>{
    const token = req?.url?.split("/")[2];
    try{
        const decode = jwt.verify(token, config.TOKEN_KEY);
        req.user = decode;
    }catch(err){
        const socketError = "NOT_AUTHORIZED"
        return socketError;
    } 
}

module.exports = {
    verifyTokenSocket,
    validateToken
};