const express = require("express");
const router = express.Router();
const {ViewBooks} = require('../controllers/book.ViewController');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb){
        return cb(null,'./image/')
    },
    filename: function(req, file, cb){
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})
const upload = multer({storage});
router.post("/viewBook",upload.single('image'), ViewBooks);

module.exports = router;