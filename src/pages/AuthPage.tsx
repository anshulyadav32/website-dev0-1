import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';
import LoginForm from '../components/auth/LoginForm';
import RegisterForm from '../components/auth/RegisterForm';
import { useAuth } from '../contexts/AuthContext';

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

const AuthContainer = styled.div`
  width: 100%;
  max-width: 500px;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
  color: white;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 300;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Handle OAuth callback
  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      localStorage.setItem('authToken', token);
      window.location.href = '/';
    }
  }, [searchParams]);

  // Redirect if already logged in
  useEffect(() => {
    if (user && !isLoading) {
      navigate('/');
    }
  }, [user, isLoading, navigate]);

  if (isLoading) {
    return (
      <PageContainer>
        <div style={{ color: 'white', textAlign: 'center' }}>
          Loading...
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <AuthContainer>
        <Header>
          <Title>DNS Monitor</Title>
          <Subtitle>Manage your DNS records with ease</Subtitle>
        </Header>
        
        {isLogin ? (
          <LoginForm onSwitchToRegister={() => setIsLogin(false)} />
        ) : (
          <RegisterForm onSwitchToLogin={() => setIsLogin(true)} />
        )}
      </AuthContainer>
    </PageContainer>
  );
};

export default AuthPage;
