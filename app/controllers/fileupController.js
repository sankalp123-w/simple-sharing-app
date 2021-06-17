require('dotenv').config();
const multer = require('multer');
const path = require('path');
const File = require('../db/file');
const { v4: uuidv4 } = require('uuid');

let storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/') ,
    filename: (req, file, cb) => {
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
              cb(null, uniqueName)
    } ,
});

let upload = multer({ storage, limits:{ fileSize: 1000000 * 100 }, }).single('myfile'); //100mb


function fileupController(){
  
    return{
        index(req,res){
      return  res.render('home')
        },

       async  uploadfile(req,res){
        upload(req, res, async (err) => {
          if (err) {
            return res.status(500).send({ error: err.message });
          }
            const file = new File({
                filename: req.file.filename,
                uuid: uuidv4(),
                path: req.file.path,
                size: req.file.size
            });
            const response = await file.save();
                 res.render('showfilel',{ file:`${process.env.APP_BASE_URL}/files/${response.uuid}`,uuid:response.uuid});
                });


        }


}}
module.exports=fileupController;