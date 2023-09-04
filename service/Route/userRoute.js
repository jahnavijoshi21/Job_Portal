const express = require('express')

const routes = express.Router();

const userController = require('../Controller/userController');


const multer = require('multer')

const strorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
      },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now();
        cb(null, uniqueSuffix + '-' + file.originalname)
        console.log(file);
    }
})

const upload = multer({storage: strorage})

routes.post('/create',userController.create);
routes.get('/getall',userController.getAll);
routes.delete('/deleteById',userController.deleteById);
routes.post('/updateprofile',upload.single("file"),userController.updateUser);
routes.post('/login',userController.loginuser);

module.exports = routes