import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, Search, X, User, LogOut, PlusCircle, LayoutDashboard, LogIn, HelpCircle } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleSupportClick = () => {
    window.location.href = 'mailto:support@youlistauction.com?subject=Customer Support Request';
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-black shadow-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary-500">YouList</span>
            <span className="text-2xl font-light text-white">Auction</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search auctions..."
                className="w-64 pl-10 pr-4 py-2 rounded-full bg-gray-900 border border-gray-700 text-white focus:outline-none focus:border-primary-500"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </form>

            {/* Navigation Links */}
            <Link
              to="/explore"
              className="text-white hover:text-primary-500 font-medium"
            >
              Explore
            </Link>

            <Link
              to="/why-choose"
              className="text-white hover:text-primary-500 font-medium"
            >
              Why Choose Us
            </Link>

            {/* Support Button */}
            <button
              onClick={handleSupportClick}
              className="flex items-center space-x-1 text-white hover:text-primary-500 font-medium"
            >
              <HelpCircle className="h-5 w-5" />
              <span>Support</span>
            </button>

            {isAuthenticated ? (
              <>
                <Link
                  to="/create-listing"
                  className="flex items-center space-x-1 text-white hover:text-primary-500 font-medium"
                >
                  <PlusCircle className="h-5 w-5" />
                  <span>List Item</span>
                </Link>
                <div className="relative group">
                  <button
                    className="flex items-center space-x-1 text-white hover:text-primary-500 font-medium"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                  >
                    <User className="h-5 w-5" />
                    <span>{user?.firstName}</span>
                  </button>
                  {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-gray-900 ring-1 ring-black ring-opacity-5">
                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <LayoutDashboard className="h-5 w-5 mr-2" />
                          Dashboard
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          <User className="h-5 w-5 mr-2" />
                          Profile
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="flex items-center w-full px-4 py-2 text-sm text-gray-300 hover:bg-gray-800"
                        >
                          <LogOut className="h-5 w-5 mr-2" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="flex items-center space-x-1 text-white hover:text-primary-500 font-medium"
              >
                <LogIn className="h-5 w-5" />
                <span>Login</span>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:text-primary-500"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-gray-900">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <form onSubmit={handleSearch} className="mb-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search auctions..."
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-800 border border-gray-700 text-white focus:outline-none focus:border-primary-500"
                />
                <Search className="absolute left-7 top-[4.5rem] h-5 w-5 text-gray-400" />
              </form>

              <Link
                to="/explore"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary-500 hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Explore
              </Link>

              <Link
                to="/why-choose"
                className="block px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary-500 hover:bg-gray-800"
                onClick={() => setIsMenuOpen(false)}
              >
                Why Choose Us
              </Link>

              {/* Mobile Support Button */}
              <button
                onClick={() => {
                  handleSupportClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary-500 hover:bg-gray-800"
              >
                <HelpCircle className="h-5 w-5 mr-2" />
                Support
              </button>

              {isAuthenticated ? (
                <>
                  <Link
                    to="/create-listing"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary-500 hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <PlusCircle className="h-5 w-5 mr-2" />
                    List Item
                  </Link>
                  <Link
                    to="/dashboard"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary-500 hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <LayoutDashboard className="h-5 w-5 mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/profile"
                    className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary-500 hover:bg-gray-800"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <User className="h-5 w-5 mr-2" />
                    Profile
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary-500 hover:bg-gray-800"
                  >
                    <LogOut className="h-5 w-5 mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center px-3 py-2 rounded-md text-base font-medium text-white hover:text-primary-500 hover:bg-gray-800"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;