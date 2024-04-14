const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: true, minLength: 1, maxLength: 50 },
    email: { type: String, required: true, unique: true, minLength: 1, maxLength: 255 },
    password: { type: String, required: true, minLength: 1, maxLength: 255 }
});

const User = mongoose.model('User', userSchema);

const userAddressSchema = new mongoose.Schema({
    // fullName: { type: String, required: true, minLength: 1, maxLength: 50 },
    // email: { type: String, required: true, unique: true, minLength: 1, maxLength: 255 },
    refUser: { type: mongoose.Schema.Types.ObjectId, required: true, unique: true,  ref: 'User' }, // Reference to another User schema
    addresses: [
        {
            street: { type: String, required: true },
            city: { type: String, required: true },
            state: { type: String },
            country: { type: String, required: true },
            postalCode: { type: String, required: true },
            isDefault: { type: Boolean, default: false }, // Set to true for default address
            mobileNumber: { type: String },
            alternativeMobileNumber: { type: String } // Added field for alternative mobile number
        }
    ],
    // mobileNumber: { type: String },
    // alternativeMobileNumber: { type: String }, // Added field for alternative mobile number
});


const UserAddress = mongoose.model('UserAddress', userAddressSchema);

const adminSchema = new mongoose.Schema({
    username: { type: String, required: true, minLength: 1, maxLength: 50 },
    email: { type: String, required: true, minLength: 1, maxLength: 255 },
    password: { type: String, required: true, minLength: 1, maxLength: 255 }
});

const Admin = mongoose.model('Admin', userSchema);

const bookSchema = new mongoose.Schema({
    bookName: { type: String, required: true, unique: true, minLength: 1, maxLength: 255 },
    author: { type: String, required: true, minLength: 1, maxLength: 255 },
    genre: { type: String, required: true, enum: ["Fiction", "Action and Adventure", "Mystery", "Science Fiction", "Fantasy", "Horror", "Biography", "Auto-biography", "History", "Self-help", "Science", "Romance"] },
    bookPrice: { type: Number, required: true },
    bookQuantity: { type: Number, required: true },
    isbn: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(value) {
                // ISBN Validation: ISBN must be a 10 or 13 digit number
                return /^\d{10}|\d{13}$/.test(value);
            },
            message: props => `${props.value} is not a valid ISBN number!`
        }
    },
    // bookType: { type: String, required: true, enum: ["Book","Magazine"] },
    bookImage: { type: String,  required: true, minLength: 1, maxLength: 255}, // Assuming image is stored as a path or URL
    bookDescription: { type: String, required: true, minLength: 1, maxLength: 255 }
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

const cartSchema = new mongoose.Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User' // Reference to the user collection
    },
    cartItems:[{
        item: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Book'
        },
        quantity: {
          type: Number,
          default: 1 // Default quantity is 1
        }
    }]
});

const Cart  = mongoose.model('Cart', cartSchema);

module.exports = { User, Admin, Book, Purchase, Review, Invoice, Cart, UserAddress };
