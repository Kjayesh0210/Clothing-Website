# THREADDOT 👕
A full-stack MERN e-commerce application for a modern clothing brand. THREADDOT is built with scalability, security, and user experience in mind, featuring a complete shopping experience for customers along with a powerful admin dashboard for managing products, orders, categories, and more.
## Live Demo
🌐 Frontend: https://threaddot.vercel.app
⚙️ Backend: https://threaddot.onrender.com
---
## Tech Stack
### Frontend
- React (Vite)
- Tailwind CSS
- React Router
- Axios
- React Hot Toast
- Chart.js
- Lucide React
### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt
- Multer
- Cloudinary
- Razorpay
### Deployment
- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)
---

# Features
## Customer
- Browse products with pagination
- Search products
- Filter by
  - Category
  - Gender
  - Price
  - Stock
- Sorting options
- Product details page
- Image gallery
- Product reviews & ratings
- Wishlist
- Shopping cart
- Coupon support
- Multiple saved addresses
- Secure checkout
- Razorpay payment integration
- Order history
- Password change
- Responsive UI
---

## Admin
- Dashboard with analytics
- Product management
  - Add products
  - Edit products
  - Delete products
- Category management
- Coupon management
- Order management
- Low stock monitoring
- Image upload via Cloudinary
- Sales statistics
---

# Security Features
- JWT Authentication
- Password hashing using bcrypt
- Protected routes
- Role-based access control
- Rate limiting
- Helmet security headers
- Backend validations
- Ownership verification
---

# Performance Optimizations
- Lazy image loading
- Image compression before upload
- Debounced search
- Pagination
- React.memo optimization
- Loading skeletons
- Optimized database queries
---

# Folder Structure
```
THREADDOT
│
├── frontend
│   ├── src
│   ├── public
│   └── ...
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── config
│   └── ...
│
└── README.md
```
# Environment Variables
## Backend
```env
PORT=
MONGO_URI=
JWT_SECRET=
CLIENT_URL=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
RAZORPAY_KEY_ID=
RAZORPAY_KEY_SECRET=
EMAIL_USER=
EMAIL_PASS=
```
## Frontend
```env
VITE_API_URL=
VITE_RAZORPAY_KEY_ID=
```
# What I Learned
Building THREADDOT gave me hands-on experience with designing and deploying a production-ready MERN application. Throughout the project, I worked on authentication, authorization, database design, REST APIs, payment integration, image management, deployment, performance optimization, and responsive UI development.
The deployment process also introduced me to practical challenges such as CORS configuration, environment variable management, MongoDB Atlas migration, Linux case sensitivity, and hosting a full-stack application using Vercel and Render.
---

# License

This project is built for learning and portfolio purposes.
