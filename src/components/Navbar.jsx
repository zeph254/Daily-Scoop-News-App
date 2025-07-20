import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubscribeModal from './SubscribeModal';

export default function Navbar({ activeCategory, setActiveCategory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const [isSubscribeModalOpen, setIsSubscribeModalOpen] = useState(false);
  const navigate = useNavigate();

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const newsCategories = [
    // { name: 'Home', id: 'general' },
    // { name: 'Business', id: 'business' },
    // { name: 'Technology', id: 'technology' },
    // { name: 'Health', id: 'health' },
    // { name: 'Entertainment', id: 'entertainment' },
    // { name: 'Sports', id: 'sports' },
    // { name: 'Science', id: 'science' }
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleCategoryChange = (category) => {
    setActiveCategory(category.id);
    navigate(category.id === 'general' ? '/' : `/${category.id}`);
    setIsOpen(false); // Close mobile menu on selection
  };

  return (
    <nav className={`sticky top-0 z-50 ${isScrolled ? 'bg-blue-900 shadow-lg' : 'bg-blue-900/90 backdrop-blur-sm'}`}>
      {/* Top bar with date/time */}
      <div className="bg-blue-800 text-blue-100 text-xs py-1 px-4 flex justify-between">
        <div>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        <div>Live Updates | {formatTime(currentTime)}</div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="text-2xl font-bold bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent"
            onClick={() => handleCategoryChange({ id: 'general', name: 'Home' })}
          >
            Daily Scoop
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {newsCategories.map((category) => (
              <Link
                key={category.id}
                to={category.id === 'general' ? '/' : `/${category.id}`}
                className={`px-3 py-2 text-sm font-medium transition-colors ${
                  activeCategory === category.id 
                    ? 'text-white border-b-2 border-blue-300' 
                    : 'text-blue-200 hover:text-white'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.name}
              </Link>
            ))}
          </div>

          {/* Subscribe Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => setIsSubscribeModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
            >
              Subscribe
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-blue-200 hover:text-white p-2 focus:outline-none"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        <div className={`md:hidden ${isOpen ? 'block' : 'hidden'} bg-blue-800 rounded-lg mt-2 mb-2`}>
          <div className="px-2 py-2 space-y-1">
            {newsCategories.map((category) => (
              <Link
                key={category.id}
                to={category.id === 'general' ? '/' : `/${category.id}`}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeCategory === category.id 
                    ? 'bg-blue-700 text-white' 
                    : 'text-blue-200 hover:bg-blue-700 hover:text-white'
                }`}
                onClick={() => handleCategoryChange(category)}
              >
                {category.name}
              </Link>
            ))}
            <button 
              onClick={() => {
                setIsSubscribeModalOpen(true);
                setIsOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-blue-200 hover:bg-blue-700 hover:text-white"
            >
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Subscribe Modal */}
      <SubscribeModal 
        isOpen={isSubscribeModalOpen} 
        onClose={() => setIsSubscribeModalOpen(false)} 
      />
    </nav>
  );
}