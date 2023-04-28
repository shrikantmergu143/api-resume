const jwt = require("jsonwebtoken");

const config = process.env;

const verifyToken = (req, res, next) =>{
    let token = req.body.token || req.query.token || req.header("authorization");
    if(!token){
        return res.status(403).json({error:"A token is required for authentication"});
    }
    try{
        token = token.replace(/^Bearer\s+/, "");
        const decoded = jwt.verify(token, config.TOKEN_KEY);

        req.user = decoded;
    }catch(err){
        return res.status(500).json({error:"Invalid token"});
    }
    return next();
}

module.exports = verifyToken;