import styled from 'styled-components';
import React from 'react';

// Form Components
export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const FormLabel = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  font-size: 0.875rem;
  color: var(--color-text);
`;

export const Select = styled.select`
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 0.75rem center;
  background-size: 16px;
  
  &:focus {
    border-color: var(--color-primary);
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

// Alert Component
interface AlertProps {
  variant?: 'info' | 'success' | 'warning' | 'error';
  children: React.ReactNode;
  style?: React.CSSProperties;
  onClose?: () => void;
}

const StyledAlert = styled.div<{ variant: string }>`
  padding: 1rem;
  margin-bottom: 1rem;
  border-radius: var(--radius);
  display: flex;
  align-items: flex-start;
  
  background-color: ${props => {
    switch (props.variant) {
      case 'info': return 'rgba(59, 130, 246, 0.1)';
      case 'success': return 'rgba(16, 185, 129, 0.1)';
      case 'warning': return 'rgba(245, 158, 11, 0.1)';
      case 'error': return 'rgba(239, 68, 68, 0.1)';
      default: return 'rgba(59, 130, 246, 0.1)';
    }
  }};
  
  color: ${props => {
    switch (props.variant) {
      case 'info': return 'rgb(30, 64, 175)';
      case 'success': return 'rgb(6, 95, 70)';
      case 'warning': return 'rgb(146, 64, 14)';
      case 'error': return 'rgb(153, 27, 27)';
      default: return 'rgb(30, 64, 175)';
    }
  }};
  
  border: 1px solid ${props => {
    switch (props.variant) {
      case 'info': return 'rgba(59, 130, 246, 0.2)';
      case 'success': return 'rgba(16, 185, 129, 0.2)';
      case 'warning': return 'rgba(245, 158, 11, 0.2)';
      case 'error': return 'rgba(239, 68, 68, 0.2)';
      default: return 'rgba(59, 130, 246, 0.2)';
    }
  }};
`;

const AlertContent = styled.div`
  flex: 1;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  padding: 0;
  line-height: 1;
  opacity: 0.5;
  color: inherit;
  
  &:hover {
    opacity: 1;
  }
`;

export const Alert: React.FC<AlertProps> = ({ 
  variant = 'info', 
  children, 
  style,
  onClose 
}) => {
  return (
    <StyledAlert variant={variant} style={style}>
      <AlertContent>{children}</AlertContent>
      {onClose && (
        <CloseButton onClick={onClose}>×</CloseButton>
      )}
    </StyledAlert>
  );
};