import React, { useState } from 'react';

interface NavItem {
  label: string;
  href: string;
  subItems?: NavItem[];
  isNew?: boolean;
}

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItem[] = [
    {
      label: 'Dashboard',
      href: '#'
    },
    {
      label: 'Domain Features',
      href: '#',
      subItems: [
        { label: 'DNS Records', href: '#dns-records' },
        { label: 'Domain Health', href: '#domain-health' },
        { label: 'SSL Certificate', href: '#ssl-certificate' },
        { label: 'WHOIS Information', href: '#whois-information' },
        { label: 'Domain Analytics', href: '#domain-analytics', isNew: true }
      ]
    },
    {
      label: 'Subdomains',
      href: '#',
      subItems: [
        { label: 'Manage Subdomains', href: '#manage-subdomains' },
        { label: 'Create Subdomain', href: '#create-subdomain' },
        { label: 'Subdomain Analytics', href: '#subdomain-analytics' },
        { label: 'Subdomain Settings', href: '#subdomain-settings' }
      ]
    },
    {
      label: 'Tools',
      href: '#',
      subItems: [
        { label: 'DNS Lookup', href: '#dns-lookup' },
        { label: 'WHOIS Lookup', href: '#whois-lookup' },
        { label: 'SSL Checker', href: '#ssl-checker' },
        { label: 'Ping Test', href: '#ping-test' },
        { label: 'Traceroute', href: '#traceroute', isNew: true }
      ]
    },
    {
      label: 'About',
      href: '#about'
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and Primary Navigation */}
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-700">dev0-1.com</span>
              <span className="ml-1 text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                Admin
              </span>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-4">
              {navItems.map((item) => (
                <div key={item.label} className="relative">
                  {item.subItems ? (
                    <div>
                      <button
                        onClick={() => toggleDropdown(item.label)}
                        className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none flex items-center"
                      >
                        {item.label}
                        <svg
                          className={`ml-1 h-4 w-4 transition-transform ${
                            activeDropdown === item.label ? 'transform rotate-180' : ''
                          }`}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {activeDropdown === item.label && (
                        <div className="absolute z-10 mt-1 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <div className="py-1">
                            {item.subItems.map((subItem) => (
                              <a
                                key={subItem.label}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center justify-between"
                              >
                                {subItem.label}
                                {subItem.isNew && (
                                  <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                    New
                                  </span>
                                )}
                              </a>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <a
                      href={item.href}
                      className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {item.label}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right-aligned navigation items */}
          <div className="hidden md:flex items-center">
            <div className="flex items-center border rounded-md p-1 bg-gray-50">
              <input
                type="text"
                placeholder="Search domain..."
                className="px-2 py-1 text-sm bg-transparent border-none focus:outline-none"
              />
              <button className="p-1 rounded-md text-gray-500 hover:text-gray-700">
                <svg
                  className="h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
            <div className="ml-4 flex items-center">
              <span className="text-xs text-gray-500 mr-1">Owner:</span>
              <span className="text-sm font-medium">@anshulyadav32</span>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <div key={item.label} className="px-2">
                {item.subItems ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className="w-full flex justify-between items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                    >
                      {item.label}
                      <svg
                        className={`ml-1 h-4 w-4 transition-transform ${
                          activeDropdown === item.label ? 'transform rotate-180' : ''
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {activeDropdown === item.label && (
                      <div className="mt-1 pl-4 space-y-1">
                        {item.subItems.map((subItem) => (
                          <a
                            key={subItem.label}
                            href={subItem.href}
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-600 hover:bg-gray-100 flex items-center"
                          >
                            {subItem.label}
                            {subItem.isNew && (
                              <span className="ml-2 px-2 py-0.5 text-xs font-medium rounded-full bg-green-100 text-green-800">
                                New
                              </span>
                            )}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <a
                    href={item.href}
                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-100"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}
            <div className="px-4 py-3 border-t border-gray-200">
              <div className="flex items-center">
                <span className="text-sm text-gray-500 mr-1">Owner:</span>
                <span className="text-sm font-medium">@anshulyadav32</span>
              </div>
              <div className="mt-3 flex items-center border rounded-md p-1 bg-gray-50">
                <input
                  type="text"
                  placeholder="Search domain..."
                  className="flex-1 px-2 py-1 text-sm bg-transparent border-none focus:outline-none"
                />
                <button className="p-1 rounded-md text-gray-500 hover:text-gray-700">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavigationBar;