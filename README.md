Chatty 💬
A real-time chat application that allows users to connect, chat with each other, and see online status in real-time. Built as a learning project to explore full-stack development with modern web technologies.
🚀 Features

✅ Real-time messaging with Socket.io
✅ User authentication with JWT
✅ Online/Offline status indicators
✅ Responsive UI design
✅ Light/Dark mode toggle
✅ Toast notifications
✅ Global state management
🚧 Deployment (coming soon)

📸 Screenshots
Login Page
Afficher l'image
Chat Interface
Afficher l'image
Welcome Screen
Afficher l'image
🛠️ Tech Stack
Frontend

React 19 - UI library
Vite - Build tool and dev server
Tailwind CSS - Utility-first CSS framework
DaisyUI - Tailwind CSS components for theming
Zustand - Lightweight state management
React Hot Toast - Toast notifications
Axios - HTTP client for API requests
Socket.io Client - Real-time communication

Backend

Node.js - Runtime environment
Express.js - Web framework
MongoDB - NoSQL database
Mongoose - MongoDB object modeling
Socket.io - Real-time bidirectional communication
JWT (jsonwebtoken) - Authentication tokens
bcrypt - Password hashing

📋 Prerequisites
Before you begin, ensure you have:

Node.js (version 16 or higher)
MongoDB installed locally or MongoDB Atlas account
Git

⚙️ Installation
1. Clone the repository
bashgit clone https://github.com/yourusername/chatty.git
cd chatty
2. Install Backend Dependencies
bashcd backend
npm install
3. Install Frontend Dependencies
bashcd ../frontend
npm install
4. Environment Variables
Create a .env file in the backend directory:
envMONGODB_URI=mongodb://localhost:27017/chatty
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=development
Create a .env file in the frontend directory:
envVITE_API_URL=http://localhost:5000
VITE_SOCKET_URL=http://localhost:5000
🚀 Running the Application
Start the Backend Server
bashcd backend
npm run dev
Start the Frontend Development Server
bashcd frontend
npm run dev
The application will be available at:

Frontend: http://localhost:5173
Backend API: http://localhost:5001

📁 Project Structure
chatty/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
├── backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   └── package.json
└── README.md
🔑 Key Learning Outcomes
This project was built to learn and practice:

Full-stack Development - Understanding the relationship between frontend and backend
API Development - Creating RESTful APIs with Express.js
Authentication - Implementing JWT-based authentication and middleware
Real-time Communication - Using Socket.io for live chat functionality
State Management - Managing global state with Zustand
Database Operations - Working with MongoDB and Mongoose
Responsive Design - Creating mobile-friendly interfaces with Tailwind CSS
Modern React - Using React 19 features and hooks
Build Tools - Working with Vite for fast development

🔐 Authentication
The app uses JWT (JSON Web Tokens) for authentication:

Users register/login with email and password
Passwords are hashed using bcrypt
JWT tokens are stored securely
Protected routes require valid authentication

🌐 API Endpoints
Authentication
POST /api/auth/register - Register new user
POST /api/auth/login - User login
POST /api/auth/logout - User logout
GET /api/auth/me - Get current user
Messages
GET /api/messages/:userId - Get chat messages
POST /api/messages/send/:userId - Send message
Users
GET /api/users - Get all users for sidebar
🎨 UI Features

Dark/Light Mode - Toggle between themes using DaisyUI
Responsive Design - Works on desktop, tablet, and mobile
Toast Notifications - User feedback for actions
Online Status - Real-time online/offline indicators
Modern Interface - Clean, modern chat interface

🚀 Deployment (Coming Soon)
Planning to deploy on:

Frontend: Vercel
Backend: Render
Database: MongoDB Atlas

🤝 Contributing
This is a learning project, but contributions are welcome!

Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request

📝 What I Learned

How to structure a full-stack application
Creating and consuming RESTful APIs
Implementing real-time features with WebSockets
Managing application state effectively
Building responsive and accessible UIs
Working with modern React patterns
Database modeling and relationships
Authentication and security best practices

🐛 Known Issues

 Add message search functionality
 Implement file/image sharing
 Add group chat feature
 Optimize for larger user bases

📧 Contact
Your Name - your.email@example.com
Project Link: https://github.com/yourusername/chatty
📄 License
This project is licensed under the MIT License - see the LICENSE file for details.
🙏 Acknowledgments

Socket.io documentation and community
Tailwind CSS for the amazing utility classes
React and Vite teams for excellent developer experience
MongoDB for the flexible database solution