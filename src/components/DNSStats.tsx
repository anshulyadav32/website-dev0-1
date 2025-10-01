import React from 'react';
import { DNSRecord } from '../types/dns';

interface DNSStatsProps {
  records: DNSRecord[];
  isLoading: boolean;
}

const DNSStats: React.FC<DNSStatsProps> = ({ records, isLoading }) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[...Array(4)].map((_, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-sm border">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
              <div className="h-8 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  const recordCounts = records.reduce((acc, record) => {
    acc[record.type] = (acc[record.type] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const stats = [
    {
      label: 'Total Records',
      value: records.length,
      icon: '📊',
      color: 'text-blue-600'
    },
    {
      label: 'A Records',
      value: recordCounts.A || 0,
      icon: '🌐',
      color: 'text-green-600'
    },
    {
      label: 'MX Records',
      value: recordCounts.MX || 0,
      icon: '📧',
      color: 'text-purple-600'
    },
    {
      label: 'NS Records',
      value: recordCounts.NS || 0,
      icon: '🛡️',
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">{stat.label}</p>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DNSStats;