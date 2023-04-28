const User = require("../models/user");
const Storage = require("../models/storage");
const fs = require('fs');
const path = require('path');
const uuid = require("uuid");
const event = new Date();
const DataTime = event.toISOString();
// Get the current date and time
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = currentDate.getMonth() + 1;
const date = currentDate.getDate();
const hours = currentDate.getHours();
const minutes = currentDate.getMinutes();
const seconds = currentDate.getSeconds();
const currentDateTime = new Date().toLocaleString().replace(/[\s:\/,]/g, '');


const folderHandler = async(req, res, folder) =>{
    try{
        const { file } = req.files;
        const id = uuid.v4();
        if (!file) return  {status:400, error:"File not found"} //res.status(400).json({error:"File not found"});
        const fs = require('fs');
        const user_id = req?.user?.user_id
        const user = await User.findById(user_id);
        if(user){
            // Specify the folder path you want to create
            const folderPath = `/${folder}/${year}-${month}-${date}/`; // Example folder path
            // Use fs.mkdir to create the folder
            fs.mkdir(__dirname + folderPath, { recursive: true }, (err) => {
                if (err) {
                    console.error(`Failed to create folder: ${err}`);
                } else {
                    console.log(`Folder created successfully`);
                }
            });
            const fileExtension = file.name.split('.').pop();
            const fileName = file.name.split('.')[0];
            const image_path = folderPath + `${fileName}.${fileExtension}`;

            const original = "storage" + image_path;
            file.mv(__dirname + image_path);//File move to profile storage
            const FileData  = {
                user_id:user_id,
                file_id:id,
                file_url:original,
                file_name:file?.name,
                file_path:original,
                file_size:file?.size,
                file_type:file?.mimetype,
                created_at:DataTime,
                update_at:DataTime,
            }
            const respose  = await Storage.create({...FileData}).then(res=>res);

            return  {status:200, data:respose};
        }else{
            return {status:403, error:"invalid token"};
        }
    }catch(err){
        return {status:500, error:"Error occured, Please try again"}
    }
}
const fileStorageHandler = async() =>{
    
}

module.exports = { folderHandler:folderHandler, fileStorageHandler:fileStorageHandler};