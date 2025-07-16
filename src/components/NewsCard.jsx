export default function NewsCard({ article }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-blue-800 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow h-full">
      {article.urlToImage && (
        <img 
          className="w-full h-48 object-cover" 
          src={article.urlToImage} 
          alt={article.title} 
        />
      )}
      <div className="p-6">
        <div className="flex justify-between items-start">
          <span className="text-xs font-medium text-blue-300">
            {article.source?.name}
          </span>
          <span className="text-xs text-blue-400">
            {formatDate(article.publishedAt)}
          </span>
        </div>
        <h3 className="mt-2 text-xl font-bold text-white">
          {article.title}
        </h3>
        <p className="mt-2 text-blue-200">
          {article.description}
        </p>
        <a 
          href={article.url} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-blue-100 hover:text-white text-sm font-medium"
        >
          Read more
          <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
          </svg>
        </a>
      </div>
    </div>
  );
}