import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import styled from 'styled-components';

const ChartContainer = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  padding: 16px;
  margin-bottom: 24px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const ChartTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  color: #333;
`;

const ChartSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: 14px;
  color: #6c757d;
`;

const ChartOptions = styled.div`
  display: flex;
  align-items: center;
`;

const TimeRangeSelector = styled.select`
  padding: 6px 10px;
  border-radius: 4px;
  border: 1px solid #dee2e6;
  font-size: 14px;
  background-color: white;
`;

/**
 * ResponseTimeChart - A reusable component for displaying DNS response time data
 * 
 * @param {Object} props - Component props
 * @param {string} props.title - Chart title
 * @param {string} props.subtitle - Chart subtitle
 * @param {Array} props.data - Array of data points with timestamp and responseTime properties
 * @param {Array} props.domains - Array of domain names to display (each will be a separate line)
 * @param {string} props.timeRange - Time range for the data (e.g., '1h', '24h', '7d', '30d')
 * @param {Function} props.onTimeRangeChange - Callback when time range changes
 */
const ResponseTimeChart = ({
  title = 'Response Time',
  subtitle = 'Average response time in milliseconds',
  data = [],
  domains = [],
  timeRange = '24h',
  onTimeRangeChange = (value: string) => {}
}) => {
  // Generate a color for each domain
  const colors = ['#2196F3', '#FF9800', '#4CAF50', '#F44336', '#9C27B0', '#795548', '#607D8B'];

  // Format timestamp for x-axis
  const formatXAxis = (timestamp: any) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  // Custom tooltip that shows all domains at a given timestamp
  const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: any[]; label?: any }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '10px', 
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p style={{ margin: 0, fontWeight: 'bold' }}>{formatXAxis(label)}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ margin: '4px 0', color: entry.color }}>
              {entry.name}: {entry.value}ms
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer>
      <ChartHeader>
        <div>
          <ChartTitle>{title}</ChartTitle>
          <ChartSubtitle>{subtitle}</ChartSubtitle>
        </div>
        <ChartOptions>
          <TimeRangeSelector
            value={timeRange}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onTimeRangeChange(e.target.value)}
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
          </TimeRangeSelector>
        </ChartOptions>
      </ChartHeader>
      
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="timestamp" 
            tickFormatter={formatXAxis}
            minTickGap={30}
          />
          <YAxis 
            unit="ms" 
            allowDecimals={false} 
            domain={['auto', 'auto']}
          />
          <Tooltip content={(props: any) => <CustomTooltip {...props} />} />
          <Legend />
          
          {domains.map((domain, index) => (
            <Line
              key={domain}
              type="monotone"
              dataKey={`${domain}.responseTime`}
              name={domain}
              stroke={colors[index % colors.length]}
              dot={false}
              activeDot={{ r: 6 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default ResponseTimeChart;