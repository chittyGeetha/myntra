//uploading files or images
const multer=require('multer');
//destination folder public/uploads
const storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"public/uploads");

    },
    filename: (req,file,cb)=>{
        cb(null,Date.now()+file.originalname);

    },
});
module.exports={storage};