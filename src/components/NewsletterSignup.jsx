import { useState } from 'react';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { toast } from 'react-toastify';

export default function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      // Check if email already exists
      const existing = await db.collection('newsletterSubscribers')
        .where('email', '==', email)
        .get();
      
      if (!existing.empty) {
        toast.info('You are already subscribed!');
        return;
      }

      await addDoc(collection(db, "newsletterSubscribers"), {
        email,
        subscribedAt: serverTimestamp(),
        active: true,
        lastSent: null
      });
      
      setIsSubscribed(true);
      setEmail('');
      toast.success('Successfully subscribed!');
    } catch (error) {
      console.error("Error subscribing:", error);
      toast.error('Subscription failed. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-blue-800 p-5 rounded-xl shadow-lg border border-blue-700">
      <h3 className="font-bold text-xl mb-3 text-blue-100">Stay Updated</h3>
      {isSubscribed ? (
        <p className="text-green-400 text-sm mb-4">
          Thank you for subscribing to our newsletter!
        </p>
      ) : (
        <>
          <p className="text-blue-200 text-sm mb-4">
            Get the latest news delivered to your inbox
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col space-y-2">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email" 
              className="px-3 py-2 rounded bg-blue-700 border border-blue-600 text-blue-50 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button 
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-500 text-white font-medium py-2 px-4 rounded transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Subscribing...' : 'Subscribe'}
            </button>
          </form>
        </>
      )}
    </div>
  );
}