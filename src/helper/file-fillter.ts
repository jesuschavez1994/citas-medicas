export const TypeFile = (req, file, callback) => {
    if(file.originalname.match(/\.(jpg|jpeg|png)$/)){
        return callback(new Error('Formato no correcto'), false);
    }
    callback(null, true);
}