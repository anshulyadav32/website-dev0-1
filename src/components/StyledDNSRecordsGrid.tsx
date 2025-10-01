import React from 'react';
import StyledDNSRecordCard from './StyledDNSRecordCard';
import { Container, Text } from '../styles/StyledComponents';
import { Grid, Heading } from '../styles/EnhancedComponents';
import styled from 'styled-components';

interface DNSRecord {
  id: string;
  type: string;
  name: string;
  value: string;
  ttl: number;
}

interface DNSRecordsGridProps {
  records: DNSRecord[];
}

const RecordsGrid = styled(Grid)`
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1rem;
  margin-top: 1rem;
`;

const NoRecordsMessage = styled.div`
  text-align: center;
  padding: 2rem;
  background-color: var(--color-background-subtle);
  border-radius: var(--radius);
  margin-top: 1rem;
`;

const RecordsContainer = styled(Container)`
  padding: 1.5rem;
`;

const DNSRecordsGrid: React.FC<DNSRecordsGridProps> = ({ records }) => {
  const renderRecords = () => {
    if (!records || records.length === 0) {
      return (
        <NoRecordsMessage>
          <Text size="lg" color="textSecondary">No DNS records found for this domain.</Text>
          <Text>Add your first DNS record to get started.</Text>
        </NoRecordsMessage>
      );
    }

    return (
      <RecordsGrid>
        {records.map((record) => (
          <StyledDNSRecordCard
            key={record.id}
            type={record.type}
            name={record.name}
            value={record.value}
            ttl={record.ttl}
          />
        ))}
      </RecordsGrid>
    );
  };

  return (
    <RecordsContainer>
      <Heading level={2}>DNS Records</Heading>
      <Text color="textSecondary">
        Manage your domain's DNS configuration
      </Text>
      
      {renderRecords()}
    </RecordsContainer>
  );
};

export default DNSRecordsGrid;