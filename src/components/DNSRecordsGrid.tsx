import React from 'react';
import { DNSRecord } from '../types/dns';
import DNSRecordCard from './DNSRecordCard';

interface DNSRecordsGridProps {
  records: DNSRecord[];
  isLoading: boolean;
}

const DNSRecordsGrid: React.FC<DNSRecordsGridProps> = ({ records, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="bg-gray-200 rounded-lg h-40 animate-pulse"></div>
        ))}
      </div>
    );
  }

  if (records.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-400 text-6xl mb-4">🔍</div>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No DNS Records Found</h3>
        <p className="text-gray-500">Unable to retrieve DNS records for this domain.</p>
      </div>
    );
  }

  const groupedRecords = records.reduce((acc, record) => {
    if (!acc[record.type]) {
      acc[record.type] = [];
    }
    acc[record.type].push(record);
    return acc;
  }, {} as Record<string, DNSRecord[]>);

  return (
    <div className="space-y-8">
      {Object.entries(groupedRecords).map(([type, typeRecords]) => (
        <div key={type}>
          <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
            <span className="mr-2">{type} Records</span>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-sm">
              {typeRecords.length}
            </span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {typeRecords.map((record, index) => (
              <DNSRecordCard key={`${record.type}-${index}`} record={record} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DNSRecordsGrid;