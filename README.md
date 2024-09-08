# Literacy Ladder

**Literacy Ladder** is a full-stack e-commerce platform designed for buying and selling books online. This platform offers a seamless user experience for browsing books by genre, managing shopping carts, and completing purchases securely via RazorPay integration. Additionally, it features an admin panel for inventory management with complete CRUD (Create, Read, Update, Delete) functionalities.

## Features

- **User Authentication**: Secure user sign-up and login functionalities.
- **Genre-based Book Browsing**: Users can browse books based on categories and genres.
- **Cart Management**: Add to Cart, Remove from Cart, Modify Quantity, Add to Wishlist functionalities.
- **Payment Integration**: RazorPay payment gateway for secure and seamless payment processing.
- **Admin Panel**: Inventory management with the ability to add, update, and delete book listings (CRUD operations).
- **Responsive Design**: User-friendly interface optimized for both desktop and mobile users.

## Tech Stack

- **Frontend**: 
  - React.js (using Vite)
  - JavaScript
  - HTML5/CSS3
- **Backend**: 
  - Node.js
  - Express.js
- **Database**: 
  - MongoDB
- **Payment Gateway**: 
  - RazorPay API
- **Version Control**: 
  - Git
- **Deployment**: 
  - Vercel

## Installation

### Prerequisites

Before running this project, ensure that you have the following installed on your local machine:

- Node.js (v12 or higher)
- MongoDB
- Git

### Steps to Install

1. **Clone the repository:**

    ```bash
    git clone https://github.com/SupportAESS/Literacy-Ladder.git
    cd Literacy-Ladder
    ```

2. **Install dependencies:**

    ```bash
    npm install
    cd client
    npm install
    cd ..
    ```

3. **Set up environment variables:**

   Create a `.env` file in the root directory and add the following:

    ```env
    MONGODB_URI=<your-mongo-db-connection-string>
    RAZORPAY_KEY_ID=<your-razorpay-key-id>
    RAZORPAY_KEY_SECRET=<your-razorpay-key-secret>
    ```

4. **Run MongoDB**:

    Ensure MongoDB is running locally or use MongoDB Atlas.

5. **Start the development server**:

    ```bash
    npm run dev
    ```

6. **Open the app**:

    Open your browser and go to `http://localhost:3000` to access the app.

## Usage

1. **User Side**:
   - Browse books by genre and add them to your cart.
   - Modify the cart contents and proceed to payment.
   - Complete the purchase using RazorPay's secure gateway.
   
2. **Admin Side**:
   - Log in to the admin panel.
   - Manage book listings (add, update, or delete) from the inventory.
   - View and track customer orders.

## Screenshots

| Homepage | Book Details |
| --- | --- |
| ![Homepage](path-to-homepage-image) | ![Book Details](path-to-book-details-image) |

## Contributing

We welcome contributions! If you want to contribute, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License.

## Contact

For any queries or support, please reach out at:
- **Email**: Shivendra323@gmail.com
- **GitHub**: [Shivendra323](https://github.com/Shivendra323)
