import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../contexts/AuthContext';

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 1.5rem;
  color: #333;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
  
  &:focus {
    outline: none;
    border-color: #007bff;
    box-shadow: 0 0 0 2px rgba(0, 123, 255, 0.25);
  }
`;

const Button = styled.button`
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background: #0056b3;
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
  }
`;

const OAuthButton = styled.button`
  padding: 0.75rem;
  background: #333;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-top: 0.5rem;
  
  &:hover {
    background: #555;
  }
`;

const GoogleButton = styled(OAuthButton)`
  background: #db4437;
  
  &:hover {
    background: #c23321;
  }
`;

const GitHubButton = styled(OAuthButton)`
  background: #333;
  
  &:hover {
    background: #555;
  }
`;

const ErrorMessage = styled.div`
  color: #dc3545;
  background: #f8d7da;
  border: 1px solid #f5c6cb;
  padding: 0.75rem;
  border-radius: 4px;
  margin-bottom: 1rem;
`;

const Divider = styled.div`
  text-align: center;
  margin: 1rem 0;
  color: #6c757d;
  position: relative;
  
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: #ddd;
    z-index: 1;
  }
  
  span {
    background: white;
    padding: 0 1rem;
    position: relative;
    z-index: 2;
  }
`;

const Link = styled.a`
  color: #007bff;
  text-decoration: none;
  text-align: center;
  display: block;
  margin-top: 1rem;
  
  &:hover {
    text-decoration: underline;
  }
`;

interface LoginFormProps {
  onSwitchToRegister: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchToRegister }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login(email, password);
  };

  const handleGitHubLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/auth/github`;
  };

  const handleGoogleLogin = () => {
    window.location.href = `${process.env.REACT_APP_API_URL || 'http://localhost:3001/api'}/auth/google`;
  };

  return (
    <FormContainer>
      <Title>Login</Title>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      
      <Form onSubmit={handleSubmit}>
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Logging in...' : 'Login'}
        </Button>
      </Form>
      
      <Divider>
        <span>or</span>
      </Divider>
      
      <GitHubButton onClick={handleGitHubLogin}>
        Login with GitHub
      </GitHubButton>
      
      <GoogleButton onClick={handleGoogleLogin}>
        Login with Google
      </GoogleButton>
      
      <Link href="#" onClick={(e) => { e.preventDefault(); onSwitchToRegister(); }}>
        Don't have an account? Register here
      </Link>
    </FormContainer>
  );
};

export default LoginForm;
