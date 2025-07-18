# 📰 Daily Scoop - Modern News Newsletter

A feature-rich newsletter subscription system built with React, Firebase, and EmailJS. Stay informed with the latest news delivered straight to your inbox!

![Demo Screenshot](./public/screenshot.png)

---

## ✨ Key Features

| Feature              | Description                                         |
|----------------------|-----------------------------------------------------|
| 📩 Email Collection   | Secure subscriber management with Firebase Firestore |
| ✉️ Automated Emails   | Instant welcome emails via EmailJS integration      |
| 📱 Responsive Design  | Fully mobile-friendly interface                     |
| 🛡️ Spam Protection    | Basic validation to prevent abuse                   |
| 🔥 Real-time Updates  | Firebase-powered instant data sync                  |
| 🌐 Multi-source News  | Aggregated content from various reliable sources    |

---

## 🛠 Tech Stack

**Frontend**
- React 18 + Vite
- Tailwind CSS
- React Router

**Backend Services**
- Firebase Firestore (Database)
- Firebase Authentication
- Firebase Hosting
- EmailJS (Email automation)

**Deployment**
- Vercel (Frontend)
- Firebase (Backend)

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- Firebase account
- EmailJS account

### Installation

## Clone the repository
git clone https://github.com/zeph254/daily-scoop-ke.git
cd daily-scoop-ke

## Install dependencies
npm install
cd functions && npm install

## Configuration

### Firebase Setup

npm install -g firebase-tools
firebase login
firebase init

### Environment Variables

Create a .env file in the root directory:

# Firebase
VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id

# EmailJS
VITE_EMAILJS_SERVICE_ID=your-service-id
VITE_EMAILJS_TEMPLATE_ID=your-template-id
VITE_EMAILJS_PUBLIC_KEY=your-public-key

# News API
VITE_NEWSDATA_KEY=your-api-key


## 🏗 Project Structure

daily-scoop-ke/
├── src/
│   ├── assets/          # Static assets
│   ├── components/      # Reusable UI components
│   ├── firebase/        # Firebase configuration
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Page components
│   ├── utils/           # Utility functions
│   └── App.jsx          # Main application component
├── functions/           # Firebase Cloud Functions
├── public/              # Public assets
├── .env.example         # Environment variables template
└── firebase.json        # Firebase deployment config

## 🔒 Firestore Security Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /subscribers/{email} {
      allow create: if request.auth == null;
      allow read: if false;
      allow update, delete: if false;
    }
  }
}

## 🚀 Deployment
### Frontend (Vercel)

npm run build
vercel deploy

### Backend (Firebase)

firebase deploy --only hosting,functions

# 🌐 Live Demo
Check out the live application:
👉 https://daily-scoop-news-app-9615.vercel.app/

# 🤝 Contributing

Fork the project
Create your feature branch:
   git checkout -b feature/AmazingFeature

Commit your changes:
   git commit -m 'Add some amazing feature'

Push to the branch:
   git push origin feature/AmazingFeature

# 📧 Contact
Email: ularezephaniah@gmail.com
   

