import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

export default function SubscribeModal({ isOpen, onClose }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      
      // Store additional user data in Firestore
      await setDoc(doc(db, "subscribers", userCredential.user.uid), {
        email,
        name,
        subscribedAt: new Date(),
        subscriptionType: "free", // You can add paid tiers later
        preferences: []
      });
      
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
      }, 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-blue-900 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">Subscribe to Daily Scoop</h3>
          <button onClick={onClose} className="text-blue-300 hover:text-white">
            ✕
          </button>
        </div>
        
        {success ? (
          <div className="text-green-400 mb-4">
            Thank you for subscribing! You'll now receive our daily newsletter.
          </div>
        ) : (
          <form onSubmit={handleSubscribe}>
            {error && <div className="text-red-400 mb-4">{error}</div>}
            
            <div className="mb-4">
              <label htmlFor="name" className="block text-blue-200 mb-2">Full Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white"
                required
              />
            </div>
            
            <div className="mb-4">
              <label htmlFor="email" className="block text-blue-200 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white"
                required
              />
            </div>
            
            <div className="mb-6">
              <label htmlFor="password" className="block text-blue-200 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white"
                required
                minLength="6"
              />
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded font-medium transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe Now'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}