const express = require("express");
const router = express.Router();
const {AddBooks, removeBook} = require('../../controllers/Book/bookController.js');
const { ViewBooks } = require('../../controllers/Book/book.ViewController.js');
const { UpdateBooks } = require('../../controllers/Book/bookUpdateController.js');

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

router.post("/",upload.single('image'), AddBooks);

router.delete("/", removeBook);

router.get("/", ViewBooks);

router.post("/",upload.single('image'), UpdateBooks);

module.exports = router;