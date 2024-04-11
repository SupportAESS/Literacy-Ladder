const express = require("express");
const router = express.Router();
const {UpdateBooks} = require('../controllers/bookUpdateController.js');
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
router.post("/updateBookDetails",upload.single('image'), UpdateBooks);

module.exports = router;