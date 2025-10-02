import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { useAuth } from './contexts/AuthContext';
import { useDNSStatus } from './hooks/useDNSStatus';
import StyledNavigationBar from './components/StyledNavigationBar';
import StyledDomainHeader from './components/StyledDomainHeader';
import StyledDNSRecordsGrid from './components/StyledDNSRecordsGrid';
import StyledDomainDetails from './components/StyledDomainDetails';
import StyledSubdomainManager from './components/StyledSubdomainManager';
import AdminPage from './pages/AdminPage';
import AuthPage from './pages/AuthPage';
import HomePage from './pages/HomePage';
import ProtectedRoute from './components/ProtectedRoute';
import { Container } from './styles/StyledComponents';
import { Tabs, TabList, Tab, TabPanel } from './styles/TabComponents';
import { Alert } from './styles/FormComponents';

// Main dashboard component
const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { error } = useDNSStatus('dev0-1.com', 'anshulyadav32');
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Sample DNS records
  const dnsRecords = [
    {
      id: '1',
      type: 'A',
      name: 'dev0-1.com',
      value: '104.198.14.52',
      ttl: 3600
    },
    {
      id: '2',
      type: 'AAAA',
      name: 'dev0-1.com',
      value: '2001:0db8:85a3:0000:0000:8a2e:0370:7334',
      ttl: 3600
    },
    {
      id: '3',
      type: 'CNAME',
      name: 'www.dev0-1.com',
      value: 'dev0-1.com',
      ttl: 3600
    },
    {
      id: '4',
      type: 'MX',
      name: 'dev0-1.com',
      value: '10 mail.dev0-1.com',
      ttl: 3600
    },
    {
      id: '5',
      type: 'TXT',
      name: 'dev0-1.com',
      value: 'v=spf1 include:_spf.google.com ~all',
      ttl: 3600
    },
    {
      id: '6',
      type: 'NS',
      name: 'dev0-1.com',
      value: 'ns1.digitalocean.com',
      ttl: 3600
    },
    {
      id: '7',
      type: 'NS',
      name: 'dev0-1.com',
      value: 'ns2.digitalocean.com',
      ttl: 3600
    },
    {
      id: '8',
      type: 'NS',
      name: 'dev0-1.com',
      value: 'ns3.digitalocean.com',
      ttl: 3600
    }
  ];

  return (
    <div>
      <StyledNavigationBar user={user} onLogout={logout} />
      <StyledDomainHeader />
      
      <Container style={{ padding: '1rem 1.5rem' }}>
        {error && (
          <Alert variant="error" style={{ marginBottom: '1.5rem' }}>
            <strong>Error loading DNS status:</strong> {error}
          </Alert>
        )}

        <Tabs value={activeTab} onChange={setActiveTab}>
          <TabList>
            <Tab value="dashboard">DNS Dashboard</Tab>
            <Tab value="details">Domain Details</Tab>
            <Tab value="subdomains">Subdomain Manager</Tab>
          </TabList>
          
          <TabPanel value="dashboard" active={activeTab === 'dashboard'}>
            <StyledDNSRecordsGrid records={dnsRecords} />
          </TabPanel>
          
          <TabPanel value="details" active={activeTab === 'details'}>
            <StyledDomainDetails />
          </TabPanel>
          
          <TabPanel value="subdomains" active={activeTab === 'subdomains'}>
            <StyledSubdomainManager />
          </TabPanel>
        </Tabs>
      </Container>
      
      {/* Footer */}
      <footer style={{ 
        borderTop: '1px solid var(--color-border)',
        backgroundColor: 'var(--color-white)',
        marginTop: '3rem',
        padding: '1.5rem 0'
      }}>
        <Container>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text)' }}>
              © 2025 DNS Monitor for dev0-1.com
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)' }}>
              Owned by @anshulyadav32
            </div>
          </div>
        </Container>
      </footer>
    </div>
  );
};

// Main App component with routing
const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/auth" element={<AuthPage />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/admin" element={
                    <ProtectedRoute>
                      <AdminPage />
                    </ProtectedRoute>
                  } />
                </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
