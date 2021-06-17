const File = require('../db/file')
const nodemailer = require('nodemailer');
function subController (){
  return{
  async postmail(req,res){
try{

  
  	var fromemail =`${req.body.fromemail}`
    var  toemail  = `${req.body.toemail}`
    const file = await File.findOne({ uuid: req.body.uuid});
    if(file.sender) {
      return res.status(422).send({ error: 'Email already sent once.'});
    }
    file.sender = fromemail;
    file.receiver = toemail;
    const response = await file.save();

var transporter = nodemailer.createTransport({
   host: 'smtp.gmail.com',
   port: 465,
   secure: true,  
   service: 'Gmail',
  auth: {
    user:process.env.MAIL_USER,
    pass:process.env.MAIL_PASS
  },
 
});

var mailOptions = {
from: `ShareKaroIndia <${fromemail}>`,
  to: `${toemail}`,
  subject:'Mail from ShareKaroIndia', // Subject line
  text:`${fromemail} shared a file with you.`, // plain text body
  html: require('..//mailtemplate')({
   emailFrom:fromemail, 
    downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}?source=email` ,
    size:parseInt(file.size/1000) + ' KB',
    expires:'24 hours'
}),
};
transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    res.status('200').send({sucess:'email sent sucessfully'})
    console.log('Email sent: ' + info.response);
  }
});
}
catch(err){
	console.log(err)
  }
}


}

}
module.exports=subController