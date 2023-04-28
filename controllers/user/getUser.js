const User = require("../../models/user");

const getUser = async (req, res)=>{
    try{
        const user_id = req?.user?.user_id
        const user = await User.findOne({ _id:user_id});
        // return res.status(200).json({error:"Error occured, Please try again"});
        if(user){
            const payload = {
                user_id:user?._id,
                email:user.email,
                username:user.username,
            }
            if(user?.profile_url){
                payload.profile_url = user?.profile_url 
            }
            if(user?.first_name){
                payload.first_name = user?.first_name 
            }
            if(user?.last_name){
                payload.last_name = user?.last_name 
            }
            return res.status(200).json({
                userDetails:payload
            });
        }
        return res.status(403).json({error:"Token expired"});

    }catch(err){
        return res.status(500).json({error:"Error occured, Please try again"});
    }
}
module.exports = getUser;