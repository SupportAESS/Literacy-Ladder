const cloudinary = require('cloudinary').v2
const fs = require('fs')

cloudinary.config({ 
  cloud_name: 'xxxxxxxxxx', 
  api_key: 'xxxxxxxxxxxx', 
  api_secret: 'xxxxxxxxxxxxxxx' 
});

const uploadOnCloudinary = async(localFilePath) =>{
    try {
        if(!localFilePath) return null;
        //Upload file on cloudainary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type:"auto"
        })
        //File successfully uploaded to cloudinary
        //console.log(response.url);
        fs.unlinkSync(localFilePath);
        return response;
    } catch (error) {
        fs.unlinkSync(localFilePath); // remove locally saved file as upload operation failed
        return null;
    }
}

module.exports =  uploadOnCloudinary;
