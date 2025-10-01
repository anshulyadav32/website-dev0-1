import React from 'react';
import { 
  Card, 
  Text, 
  Badge,
  Divider
} from '../styles/StyledComponents';
import {
  Flex
} from '../styles/EnhancedComponents';
import styled from 'styled-components';

interface DNSRecordProps {
  type: string;
  name: string;
  value: string;
  ttl: number;
}

const RecordCard = styled(Card)`
  padding: 1rem;
  border-radius: var(--radius);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const RecordType = styled.div<{ recordType: string }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: var(--radius);
  font-weight: 700;
  font-size: 1rem;
  margin-right: 1rem;
  background-color: ${props => {
    switch (props.recordType) {
      case 'A': return 'rgba(59, 130, 246, 0.1)';
      case 'AAAA': return 'rgba(167, 139, 250, 0.1)';
      case 'CNAME': return 'rgba(16, 185, 129, 0.1)';
      case 'MX': return 'rgba(245, 158, 11, 0.1)';
      case 'TXT': return 'rgba(236, 72, 153, 0.1)';
      case 'NS': return 'rgba(124, 58, 237, 0.1)';
      case 'SOA': return 'rgba(6, 182, 212, 0.1)';
      case 'SRV': return 'rgba(249, 115, 22, 0.1)';
      case 'CAA': return 'rgba(220, 38, 38, 0.1)';
      default: return 'rgba(156, 163, 175, 0.1)';
    }
  }};
  color: ${props => {
    switch (props.recordType) {
      case 'A': return 'rgb(59, 130, 246)';
      case 'AAAA': return 'rgb(167, 139, 250)';
      case 'CNAME': return 'rgb(16, 185, 129)';
      case 'MX': return 'rgb(245, 158, 11)';
      case 'TXT': return 'rgb(236, 72, 153)';
      case 'NS': return 'rgb(124, 58, 237)';
      case 'SOA': return 'rgb(6, 182, 212)';
      case 'SRV': return 'rgb(249, 115, 22)';
      case 'CAA': return 'rgb(220, 38, 38)';
      default: return 'rgb(156, 163, 175)';
    }
  }};
`;

const RecordValue = styled.div`
  padding: 0.5rem;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: var(--radius);
  font-family: monospace;
  font-size: 0.875rem;
  width: 100%;
  overflow-wrap: break-word;
  word-break: break-all;
`;

const TTLBadge = styled.div`
  font-size: 0.75rem;
  color: var(--color-text-secondary);
  display: flex;
  align-items: center;
`;

const DNSRecordCard: React.FC<DNSRecordProps> = ({ type, name, value, ttl }) => {
  return (
    <RecordCard>
      <Flex align="center">
        <RecordType recordType={type}>{type}</RecordType>
        <div>
          <Text size="md" weight="bold">{name}</Text>
          <TTLBadge>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            TTL: {ttl} seconds
          </TTLBadge>
        </div>
        
        {(type === 'A' || type === 'AAAA') && (
          <Badge variant="info" style={{ marginLeft: 'auto' }}>
            IPv{type === 'A' ? '4' : '6'}
          </Badge>
        )}
      </Flex>
      
      <Divider spacing="sm" />
      
      <RecordValue>
        {value}
      </RecordValue>
      
      <Flex justify="flex-end" style={{ marginTop: '0.5rem' }}>
        <Badge variant="subtle">
          {type === 'A' || type === 'AAAA' ? 'Address Record' :
           type === 'CNAME' ? 'Canonical Name' :
           type === 'MX' ? 'Mail Exchange' :
           type === 'TXT' ? 'Text Record' :
           type === 'NS' ? 'Name Server' :
           type === 'SOA' ? 'Start of Authority' :
           type === 'SRV' ? 'Service Record' :
           type === 'CAA' ? 'Certificate Authority Authorization' :
           'DNS Record'}
        </Badge>
      </Flex>
    </RecordCard>
  );
};

export default DNSRecordCard;