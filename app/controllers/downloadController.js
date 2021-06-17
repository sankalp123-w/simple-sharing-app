const File = require('../db/file');

function downloadController(){
return{
  async dwfile(req,res){
    try {
        const file = await File.findOne({ uuid: req.params.uuid });
        // Link expired
        if(!file) {
            return res.render('download', { error: 'Link has been expired.'});
        } 
        return res.render('download', { uuid: file.uuid, fileName: file.filename, fileSize: file.size, downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}` });
    } catch(err) {
        return res.render('download', { error: 'Something went wrong.'});
    }
  },
 async downfile(req,res){
// Extract link and get file from storage send download stream 
 const file = await File.findOne({ uuid: req.params.uuid });
 // Link expired
 if(!file) {
      return res.render('download', { error: 'Link has been expired.'});
 } 
 const response = await file.save();
 const filePath = `${__dirname}/../../${file.path}`;
 res.download(filePath);
    
  }


}


}

module.exports = downloadController