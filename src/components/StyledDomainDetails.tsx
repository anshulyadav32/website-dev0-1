import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Card, 
  Container,
  Text,
  Input
} from '../styles/StyledComponents';
import {
  Heading,
  Button,
  Flex,
  Grid
} from '../styles/EnhancedComponents';
import {
  Tabs,
  TabList,
  Tab,
  TabPanel
} from '../styles/TabComponents';
import {
  FormGroup,
  FormLabel,
  Select
} from '../styles/FormComponents';

const DomainDetailsCard = styled(Card)`
  margin-bottom: 1.5rem;
`;

const InfoRow = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  padding: 0.75rem 0;
  border-bottom: 1px solid var(--color-border);
  
  &:last-child {
    border-bottom: none;
  }
  
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
`;

const InfoLabel = styled(Text)`
  color: var(--color-text-secondary);
  font-weight: 500;
`;

const InfoValue = styled(Text)`
  font-weight: 400;
`;

const DNSMastersForm = styled.form`
  margin-top: 1rem;
`;

const DomainDetails: React.FC = () => {
  const [activeTab, setActiveTab] = useState('registration');
  const [editMode, setEditMode] = useState(false);
  
  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };
  
  const toggleEditMode = () => {
    setEditMode(!editMode);
  };
  
  return (
    <Container>
      <Heading level={2}>Domain Details</Heading>
      <Text color="textSecondary" style={{ marginBottom: '1rem' }}>
        Complete information about dev0-1.com
      </Text>
      
      <Tabs value={activeTab} onChange={handleTabChange}>
        <TabList>
          <Tab value="registration">Registration</Tab>
          <Tab value="nameservers">Nameservers</Tab>
          <Tab value="dnssec">DNSSEC</Tab>
          <Tab value="contacts">Contacts</Tab>
        </TabList>
        
        <TabPanel value="registration" active={activeTab === 'registration'}>
          <DomainDetailsCard>
            <Flex justify="space-between" align="center" style={{ marginBottom: '1rem' }}>
              <Heading level={3}>Registration Information</Heading>
              <Button variant="outline" size="sm" onClick={toggleEditMode}>
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
            </Flex>
            
            {editMode ? (
              <form>
                <Grid columns={2} gap="1rem">
                  <FormGroup>
                    <FormLabel>Registrar</FormLabel>
                    <Input type="text" defaultValue="NameCheap Inc." />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>IANA ID</FormLabel>
                    <Input type="text" defaultValue="1068" />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Registration Date</FormLabel>
                    <Input type="date" defaultValue="2023-08-15" />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Expiration Date</FormLabel>
                    <Input type="date" defaultValue="2024-08-15" />
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Domain Status</FormLabel>
                    <Select defaultValue="clientTransferProhibited">
                      <option value="clientTransferProhibited">clientTransferProhibited</option>
                      <option value="clientUpdateProhibited">clientUpdateProhibited</option>
                      <option value="clientDeleteProhibited">clientDeleteProhibited</option>
                      <option value="serverTransferProhibited">serverTransferProhibited</option>
                    </Select>
                  </FormGroup>
                  
                  <FormGroup>
                    <FormLabel>Auto-Renew</FormLabel>
                    <Select defaultValue="true">
                      <option value="true">Enabled</option>
                      <option value="false">Disabled</option>
                    </Select>
                  </FormGroup>
                </Grid>
                
                <Flex justify="flex-end" style={{ marginTop: '1rem' }}>
                  <Button variant="secondary" style={{ marginRight: '0.5rem' }} onClick={toggleEditMode}>
                    Cancel
                  </Button>
                  <Button type="button" onClick={toggleEditMode}>
                    Save Changes
                  </Button>
                </Flex>
              </form>
            ) : (
              <>
                <InfoRow>
                  <InfoLabel>Registrar:</InfoLabel>
                  <InfoValue>NameCheap Inc.</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Registrar IANA ID:</InfoLabel>
                  <InfoValue>1068</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Registration Date:</InfoLabel>
                  <InfoValue>August 15, 2023</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Expiration Date:</InfoLabel>
                  <InfoValue>August 15, 2024</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Domain Status:</InfoLabel>
                  <InfoValue>clientTransferProhibited</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Auto-Renew:</InfoLabel>
                  <InfoValue>Enabled</InfoValue>
                </InfoRow>
                
                <InfoRow>
                  <InfoLabel>Domain Age:</InfoLabel>
                  <InfoValue>23 days</InfoValue>
                </InfoRow>
              </>
            )}
          </DomainDetailsCard>
        </TabPanel>
        
        <TabPanel value="nameservers" active={activeTab === 'nameservers'}>
          <DomainDetailsCard>
            <Heading level={3}>Nameservers</Heading>
            
            <InfoRow>
              <InfoLabel>Nameserver 1:</InfoLabel>
              <InfoValue>ns1.digitalocean.com</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Nameserver 2:</InfoLabel>
              <InfoValue>ns2.digitalocean.com</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Nameserver 3:</InfoLabel>
              <InfoValue>ns3.digitalocean.com</InfoValue>
            </InfoRow>
          </DomainDetailsCard>
          
          <DomainDetailsCard>
            <Heading level={3}>DNS Masters</Heading>
            <Text color="textSecondary" style={{ marginBottom: '1rem' }}>
              Configure primary nameservers for zone transfers
            </Text>
            
            <DNSMastersForm>
              <FormGroup>
                <FormLabel>Add DNS Master</FormLabel>
                <Flex gap="0.5rem">
                  <Input type="text" placeholder="e.g., ns1.example.com" style={{ flex: 1 }} />
                  <Button>Add</Button>
                </Flex>
              </FormGroup>
            </DNSMastersForm>
            
            <Text style={{ marginTop: '1rem' }}>No DNS masters configured</Text>
          </DomainDetailsCard>
        </TabPanel>
        
        <TabPanel value="dnssec" active={activeTab === 'dnssec'}>
          <DomainDetailsCard>
            <Heading level={3}>DNSSEC Configuration</Heading>
            <Text color="textSecondary" style={{ marginBottom: '1rem' }}>
              Domain Name System Security Extensions
            </Text>
            
            <InfoRow>
              <InfoLabel>Status:</InfoLabel>
              <InfoValue>Not Configured</InfoValue>
            </InfoRow>
            
            <Button style={{ marginTop: '1rem' }}>Configure DNSSEC</Button>
          </DomainDetailsCard>
        </TabPanel>
        
        <TabPanel value="contacts" active={activeTab === 'contacts'}>
          <DomainDetailsCard>
            <Heading level={3}>Registrant Contact</Heading>
            
            <InfoRow>
              <InfoLabel>Name:</InfoLabel>
              <InfoValue>Anshul Yadav</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Organization:</InfoLabel>
              <InfoValue>Personal</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Email:</InfoLabel>
              <InfoValue>contact@anshulyadav.com</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Phone:</InfoLabel>
              <InfoValue>+1.1234567890</InfoValue>
            </InfoRow>
            
            <InfoRow>
              <InfoLabel>Privacy:</InfoLabel>
              <InfoValue>WHOIS Privacy Protection Enabled</InfoValue>
            </InfoRow>
          </DomainDetailsCard>
          
          <Grid columns={2} gap="1rem">
            <DomainDetailsCard>
              <Heading level={3}>Administrative Contact</Heading>
              <Text color="textSecondary">Same as registrant</Text>
            </DomainDetailsCard>
            
            <DomainDetailsCard>
              <Heading level={3}>Technical Contact</Heading>
              <Text color="textSecondary">Same as registrant</Text>
            </DomainDetailsCard>
          </Grid>
        </TabPanel>
      </Tabs>
    </Container>
  );
};

export default DomainDetails;