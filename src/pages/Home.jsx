import { useState, useEffect } from 'react';
import NewsCard from '../components/NewsCard.jsx';
import LoadingSpinner from '../components/LoadingSpinner';

export default function HomePage() {
  const [trendingNews, setTrendingNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('general');
  const [searchQuery, setSearchQuery] = useState('');
  const [totalResults, setTotalResults] = useState(0);
  const [error, setError] = useState(null);

  // Replace with your NewsData.io API key
  const API_KEY = import.meta.env.VITE_NEWSDATA_KEY;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        setLoading(true);
        setError(null);
        
        let url;
        if (searchQuery) {
          url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=${encodeURIComponent(searchQuery)}&language=en`;
        } else {
          // Map your existing categories to NewsData.io's categories
          const categoryMap = {
            general: '',
            business: 'business',
            technology: 'technology',
            science: 'science',
            health: 'health',
            sports: 'sports',
            entertainment: 'entertainment'
          };
          
          const newsdataCategory = categoryMap[activeCategory] || '';
          url = `https://newsdata.io/api/1/news?apikey=${API_KEY}&language=en${newsdataCategory ? `&category=${newsdataCategory}` : ''}`;
        }
        
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.status === "success") {
          // Transform NewsData.io response to match your existing structure
          const formattedArticles = data.results.map(article => ({
            ...article,
            // Map NewsData.io fields to your expected fields
            title: article.title,
            description: article.description,
            url: article.link,
            urlToImage: article.image_url || 'https://via.placeholder.com/800x400?text=No+Image',
            publishedAt: article.pubDate,
            source: {
              name: article.source_id || 'Unknown Source'
            },
            content: article.content
          }));
          
          setTrendingNews(formattedArticles);
          setTotalResults(data.totalResults || formattedArticles.length);
        } else {
          throw new Error(data.message || 'Failed to fetch news');
        }
      } catch (error) {
        console.error("Error fetching news:", error);
        setError(error.message || 'Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // Add debounce to prevent too many API calls while typing
    const timer = setTimeout(() => {
      if (API_KEY) {
        fetchNews();
      } else {
        setError('API key is not configured');
        setLoading(false);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [activeCategory, searchQuery, API_KEY]);

  // Your existing categories
  const categories = [
    { id: 'general', name: 'Top Stories' },
    { id: 'business', name: 'Business' },
    { id: 'technology', name: 'Technology' },
    { id: 'science', name: 'Science' },
    { id: 'health', name: 'Health' },
    { id: 'sports', name: 'Sports' },
    { id: 'entertainment', name: 'Entertainment' }
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    // The search is handled automatically by the useEffect
  };

  return (
    <div className="min-h-screen bg-blue-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-800 to-blue-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
              Stay Informed with <span className="bg-gradient-to-r from-blue-300 to-blue-100 bg-clip-text text-transparent">Daily News</span>
            </h1>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-blue-200">
              Your trusted source for breaking news and in-depth reporting from around the globe.
            </p>
            
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto">
              <div className="flex rounded-md shadow-sm">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for news..."
                  className="flex-1 min-w-0 block w-full px-5 py-3 rounded-l-md border-0 bg-blue-700 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-r-md text-white bg-blue-600 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Category Tabs */}
      {!searchQuery && (
        <section className="bg-blue-950 border-b border-blue-800 sticky top-16 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex overflow-x-auto scrollbar-hide">
              <div className="flex space-x-8">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setActiveCategory(category.id);
                      setSearchQuery('');
                    }}
                    className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeCategory === category.id ? 'border-blue-400 text-blue-100' : 'border-transparent text-blue-300 hover:text-blue-100 hover:border-blue-600'}`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-800 text-white p-4 rounded-md mb-6">
            {error}
          </div>
        )}

        {/* Results count */}
        {!loading && (
          <div className="text-blue-300 mb-4">
            {searchQuery ? (
              <p>Found {totalResults} results for "{searchQuery}"</p>
            ) : (
              <p>Showing {trendingNews.length} of {totalResults} top stories</p>
            )}
          </div>
        )}

        {/* Featured Story (First article) */}
        {!loading && !searchQuery && trendingNews.length > 0 && (
          <section className="mb-12">
            <div className="bg-blue-800 rounded-xl overflow-hidden shadow-lg">
              <div className="md:flex">
                <div className="md:flex-shrink-0 md:w-2/3">
                  <img 
                    className="h-full w-full object-cover md:h-96" 
                    src={trendingNews[0].urlToImage} 
                    alt={trendingNews[0].title} 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                    }}
                  />
                </div>
                <div className="p-8">
                  <div className="uppercase tracking-wide text-sm text-blue-300 font-semibold">
                    Featured Story • {trendingNews[0].source?.name || 'Unknown Source'}
                  </div>
                  <h2 className="mt-2 text-3xl font-extrabold text-white">
                    {trendingNews[0].title}
                  </h2>
                  <p className="mt-3 text-lg text-blue-200">
                    {trendingNews[0].description || 'No description available'}
                  </p>
                  <div className="mt-6">
                    <a 
                      href={trendingNews[0].url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-800 bg-blue-100 hover:bg-blue-50"
                    >
                      Read Full Story
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* News Grid */}
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">
            {searchQuery ? (
              `Search Results for "${searchQuery}"`
            ) : (
              activeCategory === 'general' ? 'Top Stories' : `${categories.find(c => c.id === activeCategory)?.name} News`
            )}
          </h2>
          
          {loading ? (
            <div className="flex justify-center py-12">
              <LoadingSpinner />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {(searchQuery ? trendingNews : trendingNews.slice(1)).map((article, index) => (
                <NewsCard key={index} article={article} />
              ))}
            </div>
          )}
        </section>

        {/* Newsletter CTA */}
        <section className="mt-16 bg-blue-800 rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold text-white">Never Miss a Story</h2>
          <p className="mt-2 text-blue-200 max-w-2xl mx-auto">
            Subscribe to our daily newsletter and get the top news stories delivered to your inbox.
          </p>
          <form className="mt-6 sm:flex max-w-md mx-auto">
            <label htmlFor="email" className="sr-only">Email address</label>
            <input
              id="email"
              type="email"
              required
              className="w-full px-5 py-3 rounded-md border-0 bg-blue-700 text-white placeholder-blue-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              placeholder="Enter your email"
            />
            <button
              type="submit"
              className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-blue-800 bg-blue-100 hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Subscribe
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}