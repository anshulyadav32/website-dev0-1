import React from 'react';
import { DNSStatus } from '../types/dns';

interface DomainHeaderProps {
  dnsStatus: DNSStatus;
  isLoading: boolean;
}

const DomainHeader: React.FC<DomainHeaderProps> = ({ dnsStatus, isLoading }) => {
  const formatLastChecked = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      dateStyle: 'short',
      timeStyle: 'medium'
    }).format(date);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="mb-4 md:mb-0">
          <h1 className="text-responsive-lg font-bold text-gray-900 mb-2">
            DNS Status for <span className="gradient-text">{dnsStatus.domain}</span>
          </h1>
          <p className="text-gray-600">
            Domain owned by: <span className="font-semibold text-blue-600 hover:text-blue-700 transition-colors">@{dnsStatus.owner}</span>
          </p>
        </div>
        
        <div className="flex flex-col items-start md:items-end space-y-2">
          <div className="flex items-center space-x-2">
            <div className={`w-3 h-3 rounded-full ${
              isLoading ? 'bg-yellow-500 animate-pulse status-loading' : 
              dnsStatus.isReachable ? 'bg-green-500 status-online' : 'bg-red-500 status-offline'
            }`}></div>
            <span className={`text-sm font-medium ${
              isLoading ? 'text-yellow-700' : 
              dnsStatus.isReachable ? 'text-green-700' : 'text-red-700'
            }`}>
              {isLoading ? 'Checking...' : 
               dnsStatus.isReachable ? 'Online' : 'Offline'}
            </span>
          </div>
          
          {dnsStatus.responseTime && (
            <div className="text-sm text-gray-600">
              Response time: {dnsStatus.responseTime}ms
            </div>
          )}
          
          <div className="text-sm text-gray-500">
            Last checked: {formatLastChecked(dnsStatus.lastChecked)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DomainHeader;