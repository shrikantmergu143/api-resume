const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUser = async (req, res)=>{
    try{
        const user_id = req?.user?.user_id
        const user = await User.findOne({ _id:user_id});
        // return res.status(200).json({error:"Error occured, Please try again"});
        if(user){
            return res.status(200).json({
                userDetails:{
                    _id:user?._id,
                    email:user.email,
                    username:user.username
                }
            });
        }
        return res.status(403).json({error:"Token expired"});

    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = getUser;