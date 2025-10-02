import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const DatabaseStatusContainer = styled.div`
  padding: 1.5rem;
  background-color: #f8f9fa;
  border-radius: 8px;
  margin: 1rem 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const StatusHeader = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`;

const StatusIndicator = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${props => props.connected ? '#28a745' : '#dc3545'};
  margin-right: 8px;
`;

const StatusTitle = styled.h3`
  margin: 0;
  font-size: 1.25rem;
`;

const StatusDetails = styled.div`
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #dee2e6;
`;

const StatItem = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 0;
  
  &:not(:last-child) {
    border-bottom: 1px solid #eee;
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 0.5rem 1rem;
  cursor: pointer;
  font-size: 0.9rem;
  margin-top: 1rem;
  
  &:hover {
    background-color: #0069d9;
  }
  
  &:disabled {
    background-color: #6c757d;
    cursor: not-allowed;
  }
`;

/**
 * Database status component that tests connection and shows database stats
 */
const DatabaseStatus = () => {
  const [status, setStatus] = useState(null);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const checkConnection = async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Test database connection
      const response = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/db/status`);
      const connectionStatus = await response.json();
      setStatus(connectionStatus);
      
      // If connected, get database stats
      if (connectionStatus.connected) {
        try {
          const statsResponse = await fetch(`${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/db/stats`);
          const dbStats = await statsResponse.json();
          setStats(dbStats);
        } catch (statsError) {
          console.error('Error fetching database stats:', statsError);
          setStats(null);
        }
      }
    } catch (err) {
      setError(err.message);
      setStatus({ connected: false, message: 'Failed to connect to database' });
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    checkConnection();
  }, []);
  
  return (
    <DatabaseStatusContainer>
      <StatusHeader>
        {status && <StatusIndicator connected={status.connected} />}
        <StatusTitle>Database Status</StatusTitle>
      </StatusHeader>
      
      {loading ? (
        <p>Testing database connection...</p>
      ) : (
        <>
          <p>
            <strong>Status:</strong> {status?.message || 'Unknown'}
            {status?.timestamp && ` (${new Date(status.timestamp).toLocaleString()})`}
          </p>
          
          {error && <p style={{ color: '#dc3545' }}>{error}</p>}
          
          {stats && (
            <StatusDetails>
              <h4>Database Statistics</h4>
              <StatItem>
                <span>Users:</span>
                <strong>{stats.users}</strong>
              </StatItem>
              <StatItem>
                <span>DNS Records:</span>
                <strong>{stats.dnsRecords}</strong>
              </StatItem>
              <StatItem>
                <span>Monitoring Entries:</span>
                <strong>{stats.monitoringEntries}</strong>
              </StatItem>
              <StatItem>
                <span>Alerts:</span>
                <strong>{stats.alerts}</strong>
              </StatItem>
            </StatusDetails>
          )}
          
          <Button 
            onClick={checkConnection} 
            disabled={loading}
          >
            {loading ? 'Checking...' : 'Refresh Status'}
          </Button>
        </>
      )}
    </DatabaseStatusContainer>
  );
};

export default DatabaseStatus;