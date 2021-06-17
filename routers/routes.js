const fileupController = require('../app/controllers/fileupController');
const downloadController = require('../app/controllers/downloadController')
const subController = require('../app/controllers/mailController')
const route = (app)=>{

app.get('/',fileupController().index);
app.post('/upfiles',fileupController().uploadfile)
app.get('/files/:uuid', downloadController().dwfile)
app.get('/files/download/:uuid', downloadController().downfile)
app.post('/files/:uuid', subController().postmail)
}


module.exports=route