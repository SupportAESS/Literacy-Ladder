const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, minLength: 1, maxLength: 50 },
    email: { type: String, required: true, minLength: 1, maxLength: 255 },
    role: { type: String, required: true, enum: ["user", "seller", "admin"] },
    password: { type: String, required: true, minLength: 1, maxLength: 255 }
});

const User = mongoose.model('User', userSchema);

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true, minLength: 1, maxLength: 255 },
    author: { type: String, required: true, minLength: 1, maxLength: 255 },
    genre: { type: String, required: true, enum: ["Fiction", "Non-fiction", "Action and Adventure", "Mystery", "Science Fiction", "Fantasy", "Horror", "Biography", "Auto-biography", "History", "Self-help", "Science", "Romance"] },
    productPrice: { type: Number, required: true },
    productQuantity: { type: Number, required: true },
    productType: { type: String, required: true, enum: ["Book","Magazine"] },
    productDescription: { type: String, required: true, minLength: 1, maxLength: 255 }
});

const Book = mongoose.model('Book', bookSchema);

const purchaseSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    book_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
    quantity: { type: Number, required: true },
    purchase_date: { type: Date, required: true }
});

const Purchase = mongoose.model('Purchase', purchaseSchema);

const reviewSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    book_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Book" },
    rating: { type: Number, required: true, min: 1, max: 5 },
    review: { type: String, required: true, minLength: 1, maxLength: 1000 },
    review_date: { type: Date, required: true }
});

const Review = mongoose.model('Review', reviewSchema);

const invoiceSchema = new mongoose.Schema({
    user_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    purchase_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Purchase" },
    total_price: { type: Number, required: true },
    invoice_date: { type: Date, required: true }
});

const Invoice = mongoose.model('Invoice', invoiceSchema);

module.exports = { User, Book, Purchase, Review, Invoice };
