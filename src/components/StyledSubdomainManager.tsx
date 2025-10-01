import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Container, 
  Text, 
  Card, 
  Input
} from '../styles/StyledComponents';
import {
  Heading,
  Button,
  Flex,
  Grid
} from '../styles/EnhancedComponents';
import {
  FormGroup,
  FormLabel,
  Select,
  Alert
} from '../styles/FormComponents';

const SubdomainCard = styled(Card)`
  margin-bottom: 1rem;
  padding: 1.25rem;
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
  }
`;

const SubdomainName = styled(Text)`
  font-weight: 600;
  color: var(--color-heading);
  font-size: 1.125rem;
  margin-bottom: 0.25rem;
`;

const StatusDot = styled.div<{ status: string }>`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${props => {
    switch (props.status) {
      case 'active': return 'var(--color-success)';
      case 'pending': return 'var(--color-warning)';
      case 'inactive': return 'var(--color-error)';
      default: return 'var(--color-text-secondary)';
    }
  }};
  margin-right: 0.5rem;
`;

const RecordsList = styled.div`
  margin-top: 1rem;
  background-color: var(--color-background-subtle);
  border-radius: var(--radius);
  padding: 0.75rem;
`;

const RecordItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  padding: 0.5rem;
  border-radius: var(--radius);
  background-color: var(--color-white);
  margin-bottom: 0.5rem;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const RecordType = styled.span`
  font-weight: 600;
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius);
  margin-right: 0.5rem;
`;

const ActionButton = styled(Button)`
  margin-left: 0.5rem;
`;

const NewSubdomainForm = styled.form`
  margin-top: 1.5rem;
`;

const SubdomainManager: React.FC = () => {
  const [formVisible, setFormVisible] = useState(false);
  const [successAlert, setSuccessAlert] = useState<string | null>(null);
  
  // Sample subdomains data
  const subdomains = [
    {
      id: '1',
      name: 'www.dev0-1.com',
      status: 'active',
      created: '2023-08-15',
      records: [
        { type: 'A', value: '104.198.14.52', ttl: 3600 }
      ]
    },
    {
      id: '2',
      name: 'api.dev0-1.com',
      status: 'active',
      created: '2023-08-15',
      records: [
        { type: 'A', value: '104.198.14.52', ttl: 3600 },
        { type: 'TXT', value: 'v=spf1 include:_spf.google.com ~all', ttl: 3600 }
      ]
    },
    {
      id: '3',
      name: 'blog.dev0-1.com',
      status: 'pending',
      created: '2023-09-01',
      records: [
        { type: 'CNAME', value: 'blog-platform.com', ttl: 3600 }
      ]
    }
  ];

  const toggleForm = () => {
    setFormVisible(!formVisible);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setSuccessAlert('Subdomain created successfully!');
    setFormVisible(false);
    
    // Clear alert after 3 seconds
    setTimeout(() => {
      setSuccessAlert(null);
    }, 3000);
  };

  return (
    <Container>
      <Flex justify="space-between" align="center" style={{ marginBottom: '1.5rem' }}>
        <div>
          <Heading level={2}>Subdomain Manager</Heading>
          <Text color="textSecondary">
            Create and manage subdomains for dev0-1.com
          </Text>
        </div>
        <Button onClick={toggleForm}>
          {formVisible ? 'Cancel' : '+ Add Subdomain'}
        </Button>
      </Flex>
      
      {successAlert && (
        <Alert variant="success" style={{ marginBottom: '1rem' }}>
          {successAlert}
        </Alert>
      )}
      
      {formVisible && (
        <SubdomainCard>
          <Heading level={3}>Create New Subdomain</Heading>
          <NewSubdomainForm onSubmit={handleSubmit}>
            <Grid columns={2} gap="1rem">
              <FormGroup>
                <FormLabel>Subdomain Name</FormLabel>
                <Input 
                  type="text" 
                  placeholder="e.g., app" 
                  required
                />
                <Text size="sm" color="textSecondary">
                  Will be created as app.dev0-1.com
                </Text>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Record Type</FormLabel>
                <Select required>
                  <option value="A">A Record (IPv4 Address)</option>
                  <option value="AAAA">AAAA Record (IPv6 Address)</option>
                  <option value="CNAME">CNAME Record (Alias)</option>
                  <option value="MX">MX Record (Mail Exchange)</option>
                  <option value="TXT">TXT Record (Text)</option>
                </Select>
              </FormGroup>
              
              <FormGroup>
                <FormLabel>Value</FormLabel>
                <Input 
                  type="text" 
                  placeholder="e.g., 192.168.1.1 or host.example.com" 
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <FormLabel>TTL (seconds)</FormLabel>
                <Select defaultValue="3600">
                  <option value="300">300 (5 minutes)</option>
                  <option value="3600">3600 (1 hour)</option>
                  <option value="86400">86400 (1 day)</option>
                  <option value="604800">604800 (1 week)</option>
                </Select>
              </FormGroup>
            </Grid>
            
            <Flex justify="flex-end" style={{ marginTop: '1rem' }}>
              <Button variant="secondary" type="button" onClick={toggleForm} style={{ marginRight: '0.5rem' }}>
                Cancel
              </Button>
              <Button type="submit">
                Create Subdomain
              </Button>
            </Flex>
          </NewSubdomainForm>
        </SubdomainCard>
      )}
      
      {subdomains.map((subdomain) => (
        <SubdomainCard key={subdomain.id}>
          <Flex justify="space-between" align="flex-start">
            <div>
              <SubdomainName>{subdomain.name}</SubdomainName>
              <Flex align="center">
                <StatusDot status={subdomain.status} />
                <Text size="sm" color="textSecondary">
                  Status: {subdomain.status.charAt(0).toUpperCase() + subdomain.status.slice(1)} • 
                  Created: {new Date(subdomain.created).toLocaleDateString()}
                </Text>
              </Flex>
            </div>
            
            <Flex>
              <ActionButton size="sm" variant="outline">Edit</ActionButton>
              <ActionButton size="sm" variant="danger">Delete</ActionButton>
            </Flex>
          </Flex>
          
          <RecordsList>
            {subdomain.records.map((record, index) => (
              <RecordItem key={index}>
                <div>
                  <RecordType>{record.type}</RecordType>
                  <span>{record.value}</span>
                </div>
                <Text size="sm" color="textSecondary">TTL: {record.ttl}s</Text>
              </RecordItem>
            ))}
          </RecordsList>
        </SubdomainCard>
      ))}
    </Container>
  );
};

export default SubdomainManager;