import { useState } from 'react';
import { db } from '../firebase';
import { addDoc, collection } from 'firebase/firestore';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // 1. Save to Firestore
      await addDoc(collection(db, 'subscribers'), { 
        email, 
        createdAt: new Date() 
      });

      // 2. Send welcome email
      await emailjs.send(
        'service_k58uyfm', // Your service ID
        'template_123', // Replace with your template ID
        { email },
        'your-public-key' // Replace with your public key
      );

      toast.success('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      toast.error('Error: ' + error.message);
    }
  };

  return (
    <div className="newsletter-form">
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Your email"
        required
      />
      <button type="submit" onClick={handleSubmit}>
        Subscribe
      </button>
    </div>
  );
}