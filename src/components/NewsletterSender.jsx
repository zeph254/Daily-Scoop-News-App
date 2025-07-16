import { useState } from 'react';
import { toast } from 'react-toastify';

export default function NewsletterSender() {
  const [subject, setSubject] = useState('');
  const [content, setContent] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    setIsSending(true);
    
    try {
      const response = await fetch('/api/send-newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subject, content }),
      });
      
      if (!response.ok) throw new Error('Failed to send newsletter');
      
      toast.success('Newsletter sent successfully!');
      setSubject('');
      setContent('');
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to send newsletter');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="bg-blue-900 p-6 rounded-lg shadow-lg max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-white">Send Newsletter</h2>
      <form onSubmit={handleSend} className="space-y-4">
        <div>
          <label className="block text-blue-200 mb-2">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white"
            required
          />
        </div>
        <div>
          <label className="block text-blue-200 mb-2">Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full px-4 py-2 rounded bg-blue-800 border border-blue-700 text-white min-h-[200px]"
            required
          />
        </div>
        <button
          type="submit"
          disabled={isSending}
          className="bg-blue-600 hover:bg-blue-500 text-white py-2 px-6 rounded font-medium disabled:opacity-50"
        >
          {isSending ? 'Sending...' : 'Send Newsletter'}
        </button>
      </form>
    </div>
  );
}