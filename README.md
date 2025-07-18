# Daily Scoop - News Newsletter

A modern newsletter subscription system built with React, Firebase, and EmailJS.

## Features

- 📩 Email subscription collection
- 🔥 Firebase Firestore integration
- ✉️ Automated welcome emails (via EmailJS)
- 📱 Responsive design
- 🛡️ Basic spam protection

## Tech Stack

- **Frontend**: React, Tailwind CSS
- **Backend**: Firebase (Firestore, Hosting)
- **Email**: EmailJS (Free tier)
- **Deployment**: Firebase Hosting

## Setup Instructions

git clone https://github.com/zeph254/daily-scoop-ke.git
cd daily-scoop-ke

### 1. Firebase Configuration


#### Install CLI
npm install -g firebase-tools

#### Login
firebase login

#### Initialize project
firebase init

### 2. Environment Variables

Create .env file:

VITE_FIREBASE_API_KEY=your-key
VITE_FIREBASE_AUTH_DOMAIN=your-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_EMAILJS_SERVICE_ID=service_k58uyfm
VITE_EMAILJS_TEMPLATE_ID=your_template
VITE_EMAILJS_PUBLIC_KEY=your_key

### 3. Install Dependencies

npm install
cd functions && npm install

## Deployment

npm run build # FRONTEND DEPLOYMENT

firebase deploy --only hosting # BACKEND DEPLOYMENT

## Project Structure

daily-scoop-ke/
├── src/
│   ├── components/      # React components
│   ├── firebase/        # Firebase config
│   └── pages/           # Page components
├── functions/           # Cloud Functions
├── public/              # Static assets
└── firebase.json        # Deployment config

## Firestore Rules

rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /subscribers/{email} {
      allow create: if true;
      allow read, write: if false;
    }
  }
}

## Live link to the website 
