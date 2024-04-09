const { Book } = require('../models/userModel');
const uploadOnCloudinary = require('../utils/cloudinary.js');

async function insertBookData(bookName, author, genre, bookPrice, bookQuantity, bookType,bookImage, bookDescription) {
  try {
    // Create a new document with the provided data
    const newBook = new Book({
      bookName,
      author,
      genre,
      bookPrice,
      bookQuantity,
      bookType,
      bookImage,
      bookDescription
    });

    // Save the new document to the database
    await newBook.save();

    console.log("Book inserted successfully");
  } catch (error) {
    console.error("Error inserting book:", error);
  }
}

const AddBooks = (req, res) => {
  const { bookName, author, bookPrice, bookQuantity, bookType, genre, bookImage, bookDescription } = req.body;
  
  // Here you can process the received data as needed
  // For this example, I'm just logging it to the console
  console.log(req.file);
  // console.log('Received data:', {
  //   bookName,
  //   author,
  //   productPrice,
  //   productQuantity,
  //   productType,
  //   genre,
  //   productImage,
  //   productDescription
  // });

  // Respond with a success message
  //insertBookData(bookName, author, genre, bookPrice, bookQuantity, bookType,bookImage, bookDescription);
  res.send('Data received successfully!');
}

module.exports = { AddBooks };


// const newPost =  async(req, res) => {
//     // Access form data here
//     // console.log(req.body);
//     // console.log(req.file);
//     const user = await User.findOne({ username: req.body.username });
//     const id = user.username;
//     let savePost = null;
//     if(!req.file){
//       savePost = new Post({
//         content:req.body.userInput,
//         image:null,
//         username: id,
//       })
//     }
//     else{
//       const response = await uploadOnCloudinary(req.file.path);
//       savePost = new Post({
//         content:req.body.userInput,
//         image:response.url,
//         username: id,
//       });
//     }
//     const data = await savePost.save();
//     res.send("Success");
//     return data;
//   };

//   module.exports = {
//     newPost
//   }