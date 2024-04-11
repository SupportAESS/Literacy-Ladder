const express = require("express");
const router = express.Router();
const {AddBooks, removeBook} = require('../controllers/bookController.js');
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
router.post("/addBook",upload.single('image'), AddBooks);

router.delete("/removeBook", removeBook);

module.exports = router;