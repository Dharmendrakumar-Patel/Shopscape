const cloudinary = require('cloudinary').v2;
const CustomError = require('./customError');
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const imageHandler = async (inputFiles, modelName, next) => {
    try {
        const files = Array.isArray(inputFiles) ? inputFiles : [inputFiles];

        const photos = [];
        for (let i = 0; i < files.length; i++) {
            const result = await cloudinary.uploader.upload(files[i].path, {
                folder: modelName === 'user' ? `Shopscape/user-images` : `Shopscape/product-images`,
            });

            photos.push({
                url: result.secure_url,
                public_id: result.public_id
            });

            fs.unlink(files[i].path, err => {
                if (err) {
                    new CustomError(`Error deleting file ${files[i].filename}: ${err.message}`, 401).logError();
                } else {
                    console.log(`File ${files[i].filename} deleted successfully.`);
                }
            });
        }

        return photos;
    } catch (error) {
        return next(new CustomError(error, 401));
    }
};

const removeImage = async (inputFiles) => {
    try {
        console.log('Deleting resources:', inputFiles);

        const files = Array.isArray(inputFiles) ? inputFiles : [inputFiles];

        for (let i = 0; i < files.length; i++) {
            await cloudinary.uploader.destroy(files[i].public_id);
        }

        console.log('Contents deleted successfully.');
    } catch (error) {
        console.error('Error deleting content:', error.message);
        throw new CustomError(`Error deleting content: ${error.message}`, 401);
    }
};

module.exports = { imageHandler, removeImage };
