const User = require("../models/user");
const Storage = require("../models/storage");
const fs = require('fs');
const path = require('path');
const uuid = require("uuid");
const storeHandler = require("./StorageHandler")
// Get the current date and time
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const date = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const currentDateTime = new Date().toLocaleString().replace(/[\s:\/,]/g, '');
const updateDocument = async (id, file_url) => {
  try {
      const updatedResult =
          await User.findByIdAndUpdate(
              { _id: id },
              {
                profile_url:file_url
              }
          );
      return updatedResult;
  } catch (error) {
      return false
  }
};
const uploadProfile = async (req, res)=>{
  const response =  await storeHandler?.folderHandler(req, res, "profile");
    if(response?.status === 200){
      const user_id = req?.user?.user_id
      const respon = await updateDocument(user_id, response?.data?.file_url)// await User.findByIdAndUpdate({_id:user_id}, {profile_url:response?.data?.file_url}).then(res=>res);
      if(respon){
        return res.status(200).json({data:{profile_url:response?.data?.file_url}});
      }else{
        return res.status(400).json({error:"Update profile failed"});
      }
    }else{
      return res.status(response?.status).json(response);
    }
}
module.exports = uploadProfile;