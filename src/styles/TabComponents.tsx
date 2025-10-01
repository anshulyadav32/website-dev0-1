import styled from 'styled-components';
import React, { useEffect, useState } from 'react';

// Tab Components
interface TabsProps {
  value: string;
  onChange: (value: string) => void;
  children: React.ReactNode;
}

interface TabListProps {
  children: React.ReactNode;
}

interface TabProps {
  value: string;
  children: React.ReactNode;
}

interface TabPanelProps {
  value: string;
  active: boolean;
  children: React.ReactNode;
}

const StyledTabs = styled.div`
  width: 100%;
`;

const StyledTabList = styled.div`
  display: flex;
  overflow-x: auto;
  border-bottom: 1px solid var(--color-border);
  margin-bottom: 1rem;
`;

const StyledTab = styled.button<{ active?: boolean }>`
  padding: 0.75rem 1rem;
  background: none;
  border: none;
  border-bottom: 2px solid ${props => props.active ? 'var(--color-primary)' : 'transparent'};
  color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text)'};
  font-weight: ${props => props.active ? '600' : '400'};
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const StyledTabPanel = styled.div<{ active?: boolean }>`
  display: ${props => props.active ? 'block' : 'none'};
`;

export const Tabs: React.FC<TabsProps> = ({ children, value, onChange }) => {
  return (
    <TabContext.Provider value={{ activeTab: value, onChange }}>
      <StyledTabs>
        {children}
      </StyledTabs>
    </TabContext.Provider>
  );
};

export const TabList: React.FC<TabListProps> = ({ children }) => {
  return (
    <StyledTabList>
      {children}
    </StyledTabList>
  );
};

export const Tab: React.FC<TabProps> = ({ children, value }) => {
  // Access the parent Tabs context
  const context = React.useContext(TabContext);
  
  return (
    <StyledTab 
      active={context.activeTab === value}
      onClick={() => context.onChange(value)}
    >
      {children}
    </StyledTab>
  );
};

export const TabPanel: React.FC<TabPanelProps> = ({ children, value, active }) => {
  return (
    <StyledTabPanel active={active}>
      {children}
    </StyledTabPanel>
  );
};

// Create context for tabs
const TabContext = React.createContext<{
  activeTab: string;
  onChange: (value: string) => void;
}>({
  activeTab: '',
  onChange: () => {}
});

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
  const [visible, setVisible] = useState(true);
  
  useEffect(() => {
    setVisible(true);
  }, [children]);
  
  const handleClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };
  
  if (!visible) return null;
  
  return (
    <StyledAlert variant={variant} style={style}>
      <AlertContent>{children}</AlertContent>
      {onClose && (
        <CloseButton onClick={handleClose}>×</CloseButton>
      )}
    </StyledAlert>
  );
};