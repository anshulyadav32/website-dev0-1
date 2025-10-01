import React from 'react';

interface DomainDetailsProps {
  domainName: string;
  owner: string;
}

const DomainDetails: React.FC<DomainDetailsProps> = ({ domainName, owner }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-8 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Domain Information</h2>
        <div className="flex items-center">
          <span className="text-3xl font-bold gradient-text">{domainName}</span>
          <span className="ml-3 px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            Active
          </span>
        </div>
        <p className="mt-2 text-gray-600">
          Owned by <span className="font-semibold text-blue-600">@{owner}</span>
        </p>
      </div>

      {/* Domain Overview Section */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Domain Overview</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Registration Date</div>
            <div className="font-medium">October 15, 2023</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Expiration Date</div>
            <div className="font-medium">October 15, 2026</div>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="text-sm text-gray-500 mb-1">Domain Status</div>
            <div className="flex items-center">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              <span className="font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Project Details Section */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Project Details</h3>
        <div className="prose max-w-none">
          <p>
            The <strong>dev0-1.com</strong> project provides comprehensive domain management and DNS monitoring capabilities. This platform allows you to:
          </p>
          <ul className="list-disc pl-5 space-y-2 mt-3">
            <li>Monitor DNS records and their status in real-time</li>
            <li>Manage subdomains with custom configurations</li>
            <li>Track domain health and performance metrics</li>
            <li>View SSL certificate details and expiration information</li>
            <li>Access WHOIS information and registration details</li>
          </ul>
        </div>
      </div>

      {/* Subdomain Features */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Subdomain Features</h3>
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Unlimited Subdomains</h4>
            <p className="text-gray-600 text-sm">
              Create and manage unlimited subdomains under dev0-1.com. Each subdomain can have its own DNS configuration, settings, and analytics.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Custom DNS Records</h4>
            <p className="text-gray-600 text-sm">
              Configure A, AAAA, CNAME, MX, TXT, and other DNS records for each subdomain to point to different services or servers.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Subdomain Analytics</h4>
            <p className="text-gray-600 text-sm">
              Track traffic, performance, and usage statistics for each subdomain separately with detailed analytics dashboards.
            </p>
          </div>
          <div className="p-4 bg-gray-50 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-2">Subdomain Templates</h4>
            <p className="text-gray-600 text-sm">
              Use predefined templates to quickly set up subdomains for common use cases like blogs, APIs, staging environments, and more.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Information */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Technical Information</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Property
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Value
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Name Servers
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ns1.example.com, ns2.example.com
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  Registrar
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Example Registrar, Inc.
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  DNSSEC
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Enabled
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  DNS Propagation
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Complete (100%)
                </td>
              </tr>
              <tr>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  SSL Certificate
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  Let's Encrypt (Valid until Jan 15, 2026)
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Actions Section */}
      <div className="px-6 py-4 bg-gray-50 flex flex-wrap gap-2">
        <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
          Manage DNS
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
          Edit WHOIS
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
          Renew Domain
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
          Transfer Domain
        </button>
        <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors">
          Manage Subdomains
        </button>
      </div>
    </div>
  );
};

export default DomainDetails;