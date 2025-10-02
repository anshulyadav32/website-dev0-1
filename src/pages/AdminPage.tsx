import React from 'react';
import styled from 'styled-components';
import DatabaseStatus from '../components/DatabaseStatus';

const AdminPageContainer = styled.div`
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

const AdminHeader = styled.div`
  margin-bottom: 2rem;
`;

const AdminTitle = styled.h1`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const AdminSubtitle = styled.p`
  color: #6c757d;
  font-size: 1.1rem;
`;

const AdminSection = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 1px solid #dee2e6;
`;

/**
 * Admin page component that shows database status and other admin tools
 */
const AdminPage = () => {
  return (
    <AdminPageContainer>
      <AdminHeader>
        <AdminTitle>Administration Dashboard</AdminTitle>
        <AdminSubtitle>
          Manage database, users, and monitor system status
        </AdminSubtitle>
      </AdminHeader>
      
      <AdminSection>
        <SectionTitle>System Status</SectionTitle>
        <DatabaseStatus />
      </AdminSection>
      
      <AdminSection>
        <SectionTitle>Environment Information</SectionTitle>
        <div>
          <p><strong>Node Environment:</strong> {process.env.NODE_ENV}</p>
          <p><strong>Build Version:</strong> {process.env.REACT_APP_VERSION || '1.0.0'}</p>
          <p><strong>API URL:</strong> {process.env.REACT_APP_API_URL || 'Not configured'}</p>
        </div>
      </AdminSection>
    </AdminPageContainer>
  );
};

export default AdminPage;