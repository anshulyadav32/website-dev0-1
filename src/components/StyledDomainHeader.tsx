import React, { useState } from 'react';
import { 
  Container, 
  Card, 
  Text, 
  Badge
} from '../styles/StyledComponents';
import {
  Flex,
  Button,
  Heading,
  Grid
} from '../styles/EnhancedComponents';
import styled from 'styled-components';

// Status indicators
const StatusIndicator = styled.div<{ status: 'success' | 'warning' | 'error' | 'info' }>`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => {
    switch (props.status) {
      case 'success': return 'var(--color-success)';
      case 'warning': return 'var(--color-warning)';
      case 'error': return 'var(--color-error)';
      case 'info': return 'var(--color-info)';
      default: return 'var(--color-text-secondary)';
    }
  }};
`;

const DomainHeaderContainer = styled(Container)`
  padding: 1.5rem;
`;

const HeaderCard = styled(Card)`
  background-color: var(--color-background);
  box-shadow: var(--shadow-sm);
`;

const DomainTitle = styled(Heading)`
  margin: 0;
  color: var(--color-heading);
`;

const StatusBlock = styled.div`
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  border-radius: var(--radius);
  background-color: var(--color-background-subtle);
  margin-top: 1rem;

  @media (min-width: 768px) {
    margin-top: 0;
  }
`;

const StatsWrapper = styled(Grid)`
  margin-top: 1.5rem;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
`;

const StatCard = styled(Card)`
  padding: 1rem;
  text-align: center;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }
`;

const StatValue = styled.div`
  font-size: 2rem;
  font-weight: 700;
  color: var(--color-primary);
  margin: 0.5rem 0;
`;

const StyledDomainHeader: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  return (
    <DomainHeaderContainer>
      <HeaderCard>
        <Flex direction="column" gap="1rem" breakpoint="md">
          <Flex justify="space-between" align="flex-start" gap="1rem" wrap>
            <div>
              <DomainTitle level={1}>dev0-1.com</DomainTitle>
              <Text color="textSecondary">
                Last updated: {new Date().toLocaleString()}
              </Text>
            </div>
            
            <Button onClick={handleRefresh} isLoading={refreshing}>
              {refreshing ? 'Refreshing...' : 'Refresh DNS'}
            </Button>
          </Flex>
          
          <Flex justify="space-between" gap="1rem" wrap>
            <StatusBlock>
              <StatusIndicator status="success" />
              <Text>Domain Status: <strong>Active</strong></Text>
            </StatusBlock>
            
            <StatusBlock>
              <StatusIndicator status="success" />
              <Text>DNS Propagation: <strong>100%</strong></Text>
            </StatusBlock>
            
            <StatusBlock>
              <StatusIndicator status="success" />
              <Text>SSL Certificate: <strong>Valid</strong></Text>
            </StatusBlock>
          </Flex>
        </Flex>
      </HeaderCard>
      
      <StatsWrapper>
        <StatCard>
          <Text color="textSecondary" size="sm">Total DNS Records</Text>
          <StatValue>12</StatValue>
          <Badge variant="primary">All Active</Badge>
        </StatCard>
        
        <StatCard>
          <Text color="textSecondary" size="sm">Subdomains</Text>
          <StatValue>5</StatValue>
          <Badge variant="success">All Healthy</Badge>
        </StatCard>
        
        <StatCard>
          <Text color="textSecondary" size="sm">Domain Age</Text>
          <StatValue>23</StatValue>
          <Text size="sm">days</Text>
        </StatCard>
        
        <StatCard>
          <Text color="textSecondary" size="sm">Expiry</Text>
          <StatValue>342</StatValue>
          <Text size="sm">days remaining</Text>
        </StatCard>
      </StatsWrapper>
    </DomainHeaderContainer>
  );
};

export default StyledDomainHeader;