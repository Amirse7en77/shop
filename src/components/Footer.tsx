const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white pt-12 pb-8 rounded-3xl mx-4">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">Your Brand</h3>
              <p className="text-gray-400">
                Creating quality products that make life better.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-blue-400 transition-colors">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    {/* Twitter icon */}
                  </svg>
                </a>
                {/* Add other social icons */}
              </div>
            </div>
  
            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Shop</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">About</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors">Contact</a></li>
              </ul>
            </div>
  
            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2 text-gray-400">
                <li>123 Business Street</li>
                <li>New York, NY 10001</li>
                <li>Email: info@example.com</li>
                <li>Phone: (555) 123-4567</li>
              </ul>
            </div>
  
            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <form className="flex flex-col space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-400"
                />
                <button 
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded transition-colors"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
  
          {/* Copyright */}
          <div className="border-t border-gray-800 pt-6 text-center md:text-left">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400">
                © {new Date().getFullYear()} Your Brand. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Privacy Policy</a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  export default Footer