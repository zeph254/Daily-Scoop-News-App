export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const footerLinks = [
    { title: "Company", links: ["About Us", "Careers", "Newsroom", "Contact"] },
    { title: "Categories", links: ["Politics", "Business", "Technology", "Health", "Sports"] },
    { title: "Legal", links: ["Terms of Service", "Privacy Policy", "Cookie Policy", "GDPR"] },
  ];

  const socialMedia = [
    { name: "Twitter", icon: "M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" },
    { name: "Facebook", icon: "M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z" },
    { name: "Instagram", icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" },
  ];

  return (
    <footer className="bg-blue-950 text-blue-100 border-t border-blue-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Logo and description */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-blue-200 bg-clip-text text-transparent">
              Daily Scoop
            </h2>
            <p className="text-blue-300 text-sm">
              Delivering accurate and timely news from around the globe. Your trusted source for breaking news and in-depth analysis.
            </p>
            <div className="flex space-x-4 pt-2">
              {socialMedia.map((social) => (
                <a 
                  key={social.name}
                  href="#"
                  className="text-blue-300 hover:text-blue-100 transition-colors"
                  aria-label={social.name}
                >
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Footer links */}
          {footerLinks.map((section) => (
            <div key={section.title} className="space-y-4">
              <h3 className="text-blue-100 font-semibold uppercase text-sm tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a 
                      href="#" 
                      className="text-blue-300 hover:text-blue-100 text-sm transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-blue-100 font-semibold uppercase text-sm tracking-wider">
              Newsletter
            </h3>
            <p className="text-blue-300 text-sm">
              Subscribe to our newsletter for daily news updates.
            </p>
            <form className="mt-2 space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-2 rounded-md bg-blue-900 border border-blue-800 text-blue-100 placeholder-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              />
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-500 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom footer */}
        <div className="border-t border-blue-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-blue-400 text-xs">
              &copy; {currentYear} Daily Scoop. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-blue-400 hover:text-blue-200 text-xs">
                Privacy Policy
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-200 text-xs">
                Terms of Service
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-200 text-xs">
                Cookie Policy
              </a>
              <a href="#" className="text-blue-400 hover:text-blue-200 text-xs">
                Accessibility
              </a>
            </div>
          </div>
          <p className="text-blue-500 text-xs mt-4 text-center md:text-left">
            NewsPulse is not responsible for the content of external sites.
          </p>
        </div>
      </div>
    </footer>
  );
}