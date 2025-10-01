import React from 'react';
import { DNSRecord } from '../types/dns';

interface DNSRecordCardProps {
  record: DNSRecord;
}

const DNSRecordCard: React.FC<DNSRecordCardProps> = ({ record }) => {
  const getRecordTypeColor = (type: string) => {
    switch (type) {
      case 'A': return 'bg-blue-100 text-blue-800';
      case 'AAAA': return 'bg-purple-100 text-purple-800';
      case 'MX': return 'bg-green-100 text-green-800';
      case 'NS': return 'bg-yellow-100 text-yellow-800';
      case 'CNAME': return 'bg-indigo-100 text-indigo-800';
      case 'TXT': return 'bg-gray-100 text-gray-800';
      case 'SOA': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200 hover:shadow-lg transition-all duration-200 card-hover">
      <div className="flex justify-between items-start mb-3">
        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRecordTypeColor(record.type)} shadow-sm`}>
          {record.type}
        </span>
        {record.ttl && (
          <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">TTL: {record.ttl}s</span>
        )}
      </div>
      
      <div className="space-y-2">
        <div>
          <span className="text-sm font-medium text-gray-600">Name:</span>
          <p className="text-gray-900 font-mono text-sm break-all">{record.name}</p>
        </div>
        
        <div>
          <span className="text-sm font-medium text-gray-600">Value:</span>
          <p className="text-gray-900 font-mono text-sm break-all">{record.value}</p>
        </div>
        
        {record.priority && (
          <div>
            <span className="text-sm font-medium text-gray-600">Priority:</span>
            <p className="text-gray-900">{record.priority}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DNSRecordCard;