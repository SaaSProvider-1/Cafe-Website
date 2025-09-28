# Café Elite Backend API

A robust Node.js/Express backend API for the Café Elite website with Google OAuth authentication.

## 🚀 Features

- **Authentication & Authorization**
  - JWT token-based authentication
  - Google OAuth 2.0 integration
  - Password reset & email verification
  - Role-based access control
  
- **User Management**
  - User registration and login
  - Profile management
  - Password change functionality
  
- **Menu Management**
  - Menu items CRUD operations
  - Categories and filtering
  - Featured items
  
- **Order System**
  - Order placement and tracking
  - Order history
  
- **Contact System**
  - Contact form submissions
  - Message management

## 📋 Prerequisites

- Node.js (v18 or higher)
- MongoDB (v6 or higher)
- Google Cloud Console project (for OAuth)

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   cd Cafe-Website/Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```env
   NODE_ENV=development
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/cafe-elite
   JWT_SECRET=your-super-secret-jwt-key
   JWT_REFRESH_SECRET=your-refresh-token-secret
   FRONTEND_URL=http://localhost:5174
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

4. **Set up Google OAuth**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing one
   - Enable Google+ API
   - Create OAuth 2.0 credentials
   - Add authorized redirect URIs:
     - `http://localhost:5000/api/auth/google/callback`
     - `http://localhost:5174` (your frontend URL)
   - Copy Client ID and Client Secret to your `.env` file

5. **Start MongoDB**
   ```bash
   # If using MongoDB locally
   mongod
   
   # Or if using MongoDB service
   sudo systemctl start mongod
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## 🔧 Google OAuth Setup Guide

### Step 1: Google Cloud Console Setup

1. **Create a Google Cloud Project**
   - Visit [Google Cloud Console](https://console.cloud.google.com/)
   - Click "Select a project" → "New Project"
   - Enter project name: "Cafe Elite Auth"
   - Click "Create"

2. **Enable Google APIs**
   - Go to "APIs & Services" → "Library"
   - Search and enable:
     - Google+ API
     - Google OAuth2 API

3. **Create OAuth 2.0 Credentials**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "OAuth 2.0 Client ID"
   - Choose "Web application"
   - Set name: "Cafe Elite Web Client"
   
4. **Configure Authorized URLs**
   - **Authorized JavaScript origins:**
     ```
     http://localhost:5174
     http://localhost:3000
     https://yourdomain.com
     ```
   
   - **Authorized redirect URIs:**
     ```
     http://localhost:5000/api/auth/google/callback
     https://yourapi.com/api/auth/google/callback
     ```

5. **Copy Credentials**
   - Copy the Client ID and Client Secret
   - Add them to your `.env` file

### Step 2: Frontend Integration

The backend provides these Google OAuth endpoints:

- **GET** `/api/auth/google-url` - Get Google OAuth authorization URL
- **POST** `/api/auth/google-login` - Login with Google ID token
- **GET** `/api/auth/google/callback` - OAuth callback handler

## 📡 API Endpoints

### Authentication
```
POST /api/auth/register          # Register new user
POST /api/auth/login             # Login user
POST /api/auth/logout            # Logout user
POST /api/auth/refresh           # Refresh tokens
GET  /api/auth/me               # Get current user
PUT  /api/auth/me               # Update profile
PUT  /api/auth/change-password  # Change password
POST /api/auth/forgot-password  # Forgot password
PUT  /api/auth/reset-password   # Reset password

# Google OAuth
GET  /api/auth/google-url        # Get Google auth URL
POST /api/auth/google-login      # Login with Google ID token
GET  /api/auth/google/callback   # OAuth callback
```

### Menu Management
```
GET  /api/menu                  # Get all menu items
GET  /api/menu/featured         # Get featured items
GET  /api/menu/:id              # Get menu item by ID
POST /api/menu                  # Create menu item (Admin)
```

### Orders
```
GET  /api/orders                # Get user orders
POST /api/orders                # Create new order
GET  /api/orders/:id            # Get order by ID
```

### Contact
```
POST /api/contact               # Send contact message
GET  /api/contact               # Get messages (Admin)
```

## 🔒 Authentication Flow

### Regular Login/Register
1. User submits credentials
2. Server validates and creates JWT tokens
3. Access token (15min) + Refresh token (30 days)
4. Refresh token stored as httpOnly cookie

### Google OAuth Flow
1. **Frontend gets auth URL**: `GET /api/auth/google-url`
2. **User authorizes on Google**
3. **Google redirects to callback**: `/api/auth/google/callback`
4. **Server creates/updates user** and generates JWT tokens
5. **Redirects to frontend** with tokens

### Google ID Token Flow (Recommended)
1. **Frontend uses Google Sign-In SDK**
2. **Gets ID token from Google**
3. **Sends token to backend**: `POST /api/auth/google-login`
4. **Server verifies token** and creates/updates user
5. **Returns JWT tokens**

## 🛡️ Security Features

- **Helmet.js** - Security headers
- **Rate limiting** - Prevent abuse
- **CORS** - Cross-origin protection  
- **Input validation** - Request sanitization
- **JWT tokens** - Secure authentication
- **Password hashing** - bcrypt encryption
- **Environment variables** - Secret management

## 🚀 Deployment

### Environment Setup
```bash
NODE_ENV=production
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cafe-elite
JWT_SECRET=your-production-jwt-secret
GOOGLE_CLIENT_ID=your-production-google-client-id
GOOGLE_CLIENT_SECRET=your-production-google-client-secret
FRONTEND_URL=https://yourdomain.com
```

### Production Checklist
- [ ] Update Google OAuth redirect URIs for production domain
- [ ] Use production MongoDB database
- [ ] Set strong JWT secrets
- [ ] Configure proper CORS origins
- [ ] Set up SSL certificates
- [ ] Configure rate limiting
- [ ] Set up logging and monitoring

## 🧪 Testing

```bash
# Run tests
npm test

# Test specific endpoint
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

## 📂 Project Structure

```
Backend/
├── controllers/         # Request handlers
├── middleware/         # Custom middleware
├── models/            # Database models
├── routes/            # API routes
├── utils/             # Helper functions
├── logs/              # Log files
├── .env               # Environment variables
├── .env.example       # Environment template
├── server.js          # Application entry point
└── package.json       # Dependencies
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Google OAuth Error: redirect_uri_mismatch**
   - Check authorized redirect URIs in Google Console
   - Ensure exact match including protocol and port

2. **JWT Token Invalid**
   - Check JWT_SECRET in environment variables
   - Ensure token is sent in Authorization header

3. **MongoDB Connection Failed**
   - Check MongoDB is running
   - Verify connection string in .env

4. **CORS Issues**
   - Add frontend URL to CORS origins
   - Check FRONTEND_URL in .env

### Support

For support, please create an issue in the repository or contact the development team.