import React, { useState } from 'react';

interface Subdomain {
  name: string;
  fullDomain: string;
  type: string;
  target: string;
  status: 'active' | 'inactive' | 'pending';
  createdAt: string;
  ssl: boolean;
}

const SubdomainManager: React.FC = () => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // Mock subdomain data
  const [subdomains, setSubdomains] = useState<Subdomain[]>([
    {
      name: 'www',
      fullDomain: 'www.dev0-1.com',
      type: 'CNAME',
      target: 'dev0-1.com',
      status: 'active',
      createdAt: '2023-10-15',
      ssl: true
    },
    {
      name: 'api',
      fullDomain: 'api.dev0-1.com',
      type: 'A',
      target: '192.168.1.100',
      status: 'active',
      createdAt: '2023-10-15',
      ssl: true
    },
    {
      name: 'blog',
      fullDomain: 'blog.dev0-1.com',
      type: 'CNAME',
      target: 'dev0-1-blog.netlify.app',
      status: 'active',
      createdAt: '2023-11-05',
      ssl: true
    },
    {
      name: 'dev',
      fullDomain: 'dev.dev0-1.com',
      type: 'A',
      target: '192.168.1.101',
      status: 'inactive',
      createdAt: '2023-12-10',
      ssl: false
    },
    {
      name: 'staging',
      fullDomain: 'staging.dev0-1.com',
      type: 'A',
      target: '192.168.1.102',
      status: 'active',
      createdAt: '2024-01-20',
      ssl: true
    },
    {
      name: 'test',
      fullDomain: 'test.dev0-1.com',
      type: 'CNAME',
      target: 'dev0-1-test.netlify.app',
      status: 'pending',
      createdAt: '2024-09-28',
      ssl: false
    }
  ]);

  // Filter subdomains based on search and status
  const filteredSubdomains = subdomains.filter(subdomain => {
    const matchesSearch = subdomain.name.includes(searchQuery) || 
                        subdomain.fullDomain.includes(searchQuery) ||
                        subdomain.target.includes(searchQuery);
    
    const matchesStatus = filterStatus === 'all' || subdomain.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const handleAddSubdomain = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name') as string;
    const type = formData.get('type') as string;
    const target = formData.get('target') as string;
    
    const newSubdomain: Subdomain = {
      name,
      fullDomain: `${name}.dev0-1.com`,
      type,
      target,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
      ssl: false
    };
    
    setSubdomains([...subdomains, newSubdomain]);
    setIsAddModalOpen(false);
  };

  const handleDeleteSubdomain = (name: string) => {
    setSubdomains(subdomains.filter(subdomain => subdomain.name !== name));
  };

  const toggleSubdomainStatus = (name: string) => {
    setSubdomains(subdomains.map(subdomain => {
      if (subdomain.name === name) {
        return {
          ...subdomain,
          status: subdomain.status === 'active' ? 'inactive' : 'active'
        };
      }
      return subdomain;
    }));
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-6 py-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Subdomain Manager</h2>
        <p className="text-gray-600">Manage all subdomains for dev0-1.com</p>
      </div>

      <div className="px-6 py-4 bg-gray-50 flex flex-col md:flex-row md:items-center md:justify-between space-y-3 md:space-y-0">
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search subdomains..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="ml-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm py-2 px-3"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
            </select>
          </div>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          <svg className="h-4 w-4 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Add Subdomain
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Subdomain
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Target
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                SSL
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredSubdomains.length > 0 ? (
              filteredSubdomains.map((subdomain) => (
                <tr key={subdomain.name}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="font-medium text-gray-900">{subdomain.name}</div>
                    <div className="text-sm text-gray-500">{subdomain.fullDomain}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${subdomain.type === 'A' ? 'bg-purple-100 text-purple-800' :
                        subdomain.type === 'CNAME' ? 'bg-blue-100 text-blue-800' :
                        subdomain.type === 'MX' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'}`}>
                      {subdomain.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subdomain.target}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${subdomain.status === 'active' ? 'bg-green-100 text-green-800' :
                        subdomain.status === 'inactive' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'}`}>
                      {subdomain.status.charAt(0).toUpperCase() + subdomain.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {subdomain.createdAt}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {subdomain.ssl ? (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Enabled
                      </span>
                    ) : (
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                        Disabled
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => toggleSubdomainStatus(subdomain.name)}
                      className={`text-xs px-2 py-1 rounded mr-1
                        ${subdomain.status === 'active' ? 'text-red-600 hover:text-red-900' : 'text-green-600 hover:text-green-900'}`}
                    >
                      {subdomain.status === 'active' ? 'Disable' : 'Enable'}
                    </button>
                    <button className="text-blue-600 hover:text-blue-900 text-xs px-2 py-1 rounded mr-1">
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteSubdomain(subdomain.name)}
                      className="text-red-600 hover:text-red-900 text-xs px-2 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                  No subdomains found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Subdomain Modal */}
      {isAddModalOpen && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                    <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                      Add New Subdomain
                    </h3>
                    <div className="mt-6">
                      <form onSubmit={handleAddSubdomain}>
                        <div className="mb-4">
                          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Subdomain Name
                          </label>
                          <div className="flex rounded-md shadow-sm">
                            <input
                              type="text"
                              name="name"
                              id="name"
                              required
                              className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-none rounded-l-md text-sm border-gray-300"
                              placeholder="www"
                            />
                            <span className="inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                              .dev0-1.com
                            </span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="type" className="block text-sm font-medium text-gray-700 mb-1">
                            Record Type
                          </label>
                          <select
                            id="type"
                            name="type"
                            required
                            className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 text-sm"
                          >
                            <option value="A">A Record</option>
                            <option value="CNAME">CNAME Record</option>
                            <option value="MX">MX Record</option>
                            <option value="TXT">TXT Record</option>
                          </select>
                        </div>
                        <div className="mb-4">
                          <label htmlFor="target" className="block text-sm font-medium text-gray-700 mb-1">
                            Target
                          </label>
                          <input
                            type="text"
                            name="target"
                            id="target"
                            required
                            className="focus:ring-blue-500 focus:border-blue-500 flex-1 block w-full rounded-md text-sm border-gray-300"
                            placeholder="192.168.1.1 or example.com"
                          />
                        </div>
                        <div className="mt-6 flex justify-end space-x-3">
                          <button
                            type="button"
                            onClick={() => setIsAddModalOpen(false)}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Cancel
                          </button>
                          <button
                            type="submit"
                            className="px-4 py-2 bg-blue-600 border border-transparent rounded-md text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                          >
                            Add Subdomain
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubdomainManager;