import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SubscribeModal from './SubscribeModal'; // Add this import

export default function Navbar({ onSearch, activeCategory, setActiveCategory }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [searchQuery, setSearchQuery] = useState('');
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
    'Home',
    'Business',
    'Technology',
    'Health',
    'Entertainment',
    'Sports',
    'Science'
  ];

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(searchQuery);
    navigate(`/?q=${encodeURIComponent(searchQuery)}`);
  };

  const handleCategoryChange = (category) => {
    const lowerCategory = category.toLowerCase();
    setActiveCategory(lowerCategory === 'home' ? 'general' : lowerCategory);
    onSearch(''); // Reset search when changing categories
    setSearchQuery(''); // Clear search input
    navigate(`/${lowerCategory === 'home' ? '' : lowerCategory}`);
  };

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-blue-950 shadow-lg' : 'bg-blue-950/95 backdrop-blur-sm'}`}>
      {/* Top bar with date/time */}
      <div className="bg-blue-900 text-blue-100 text-xs py-1 px-4 flex justify-between">
        <div>{currentTime.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</div>
        <div>Live Updates | {formatTime(currentTime)}</div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex-shrink-0 flex items-center" 
            onClick={() => handleCategoryChange('Home')}
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Daily Scoop
            </span>
          </Link>

          {/* Search bar */}
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <form onSubmit={handleSearch}>
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for news..."
                  className="w-full py-2 px-4 rounded-full bg-blue-800 border border-blue-700 text-blue-50 placeholder-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-blue-300 hover:text-blue-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </form>
          </div>

          {/* User actions */}
          <div className="flex items-center space-x-4">
            <button className="text-blue-200 hover:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </button>
                <button 
                    onClick={() => setIsSubscribeModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                >
                    Subscribe
                </button>
          </div>
        </div>
              {/* Add the modal */}
      <SubscribeModal 
        isOpen={isSubscribeModalOpen} 
        onClose={() => setIsSubscribeModalOpen(false)} 
      />

        {/* News categories */}
        <div className="flex overflow-x-auto scrollbar-hide space-x-6 py-2 border-t border-blue-800">
          {newsCategories.map((category) => (
            <Link
              key={category}
              to={`/${category.toLowerCase() === 'home' ? '' : category.toLowerCase()}`}
              className={`whitespace-nowrap px-1 py-1 text-sm font-medium transition-colors border-b-2 ${activeCategory === (category.toLowerCase() === 'home' ? 'general' : category.toLowerCase()) ? 'text-blue-100 border-blue-400' : 'text-blue-300 hover:text-blue-100 border-transparent hover:border-blue-600'}`}
              onClick={() => handleCategoryChange(category)}
            >
              {category}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}