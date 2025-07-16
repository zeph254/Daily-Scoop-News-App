const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const db = admin.firestore();

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail', // or your email provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// API endpoint to send newsletters
app.post('/api/send-newsletter', async (req, res) => {
  try {
    const { subject, content } = req.body;
    
    // Get all subscribers
    const subscribers = await db.collection('newsletterSubscribers')
      .where('active', '==', true)
      .get();
    
    // Send emails
    const promises = subscribers.docs.map(doc => {
      const subscriber = doc.data();
      return transporter.sendMail({
        from: '"Daily Scoop" <newsletter@dailyscoop.com>',
        to: subscriber.email,
        subject: subject,
        html: content
      });
    });
    
    await Promise.all(promises);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error sending newsletter:', error);
    res.status(500).json({ error: 'Failed to send newsletter' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));