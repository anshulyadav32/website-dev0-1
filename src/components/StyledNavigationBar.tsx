import React, { useState } from 'react';
import { 
  Nav, 
  NavContainer, 
  NavBrand, 
  NavMenu, 
  NavItem, 
  Badge,
  Flex,
  Input
} from '../styles/StyledComponents';
import logo from '../dns-logo.svg';
import styled from 'styled-components';

interface NavItemType {
  label: string;
  href: string;
  subItems?: NavItemType[];
  isNew?: boolean;
}

const DropdownButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  color: var(--color-text);
  font-size: 1rem;
  display: flex;
  align-items: center;
  
  &:hover {
    color: var(--color-primary);
  }
`;

const DropdownIcon = styled.svg<{ open?: boolean }>`
  width: 16px;
  height: 16px;
  margin-left: 0.5rem;
  transition: transform 0.2s ease-in-out;
  transform: ${props => props.open ? 'rotate(180deg)' : 'rotate(0)'};
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  z-index: 1000;
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  background-color: var(--color-white);
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  box-shadow: var(--shadow-md);
`;

const DropdownItem = styled.a`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0.5rem 1rem;
  clear: both;
  font-weight: 400;
  color: var(--color-text);
  text-align: inherit;
  text-decoration: none;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  
  &:hover {
    color: var(--color-primary);
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

const NavDropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const MobileMenuButton = styled.button`
  display: none;
  background: none;
  border: none;
  padding: 0.5rem;
  color: var(--color-text);
  font-size: 1.5rem;
  cursor: pointer;
  
  @media (max-width: 768px) {
    display: block;
  }
`;

const SearchContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  margin-right: 1rem;
  
  @media (max-width: 768px) {
    width: 100%;
    margin: 0.5rem 0;
  }
`;

const SearchIcon = styled.div`
  position: absolute;
  left: 0.75rem;
  color: var(--color-text-secondary);
`;

const SearchInput = styled(Input)`
  padding-left: 2.5rem;
  width: 200px;
  background-color: rgba(0, 0, 0, 0.02);
  border-radius: var(--radius-full);
  
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const NavigationBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems: NavItemType[] = [
    {
      label: 'Dashboard',
      href: '#'
    },
    {
      label: 'Domain Features',
      href: '#',
      subItems: [
        { label: 'DNS Records', href: '#dns-records' },
        { label: 'Domain Health', href: '#domain-health' },
        { label: 'SSL Certificate', href: '#ssl-certificate' },
        { label: 'WHOIS Information', href: '#whois-information' },
        { label: 'Domain Analytics', href: '#domain-analytics', isNew: true }
      ]
    },
    {
      label: 'Subdomains',
      href: '#',
      subItems: [
        { label: 'Manage Subdomains', href: '#manage-subdomains' },
        { label: 'Create Subdomain', href: '#create-subdomain' },
        { label: 'Subdomain Analytics', href: '#subdomain-analytics' },
        { label: 'Subdomain Settings', href: '#subdomain-settings' }
      ]
    },
    {
      label: 'Tools',
      href: '#',
      subItems: [
        { label: 'DNS Lookup', href: '#dns-lookup' },
        { label: 'WHOIS Lookup', href: '#whois-lookup' },
        { label: 'SSL Checker', href: '#ssl-checker' },
        { label: 'Ping Test', href: '#ping-test' },
        { label: 'Traceroute', href: '#traceroute', isNew: true }
      ]
    },
    {
      label: 'About',
      href: '#about'
    }
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = (label: string) => {
    setActiveDropdown(activeDropdown === label ? null : label);
  };

  return (
    <Nav>
      <NavContainer>
        <NavBrand>
          <img src={logo} alt="DNS Status" style={{ height: '32px', marginRight: '0.75rem' }} />
          <span style={{ color: 'var(--color-primary)' }}>dev0-1.com</span>
          <Badge variant="primary" style={{ marginLeft: '0.5rem' }}>Admin</Badge>
        </NavBrand>
        
        <MobileMenuButton onClick={toggleMenu}>
          {isMenuOpen ? '✕' : '☰'}
        </MobileMenuButton>
        
        <NavMenu open={isMenuOpen}>
          {navItems.map((item) => (
            <div key={item.label}>
              {item.subItems ? (
                <NavDropdownContainer>
                  <DropdownButton onClick={() => toggleDropdown(item.label)}>
                    {item.label}
                    <DropdownIcon 
                      open={activeDropdown === item.label}
                      xmlns="http://www.w3.org/2000/svg" 
                      viewBox="0 0 20 20" 
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </DropdownIcon>
                  </DropdownButton>
                  {activeDropdown === item.label && (
                    <DropdownMenu>
                      {item.subItems.map((subItem) => (
                        <DropdownItem key={subItem.label} href={subItem.href}>
                          {subItem.label}
                          {subItem.isNew && (
                            <Badge variant="success" style={{ marginLeft: '0.5rem' }}>New</Badge>
                          )}
                        </DropdownItem>
                      ))}
                    </DropdownMenu>
                  )}
                </NavDropdownContainer>
              ) : (
                <NavItem href={item.href}>
                  {item.label}
                </NavItem>
              )}
            </div>
          ))}
          
          <Flex align="center" style={{ marginLeft: 'auto' }}>
            <SearchContainer>
              <SearchIcon>
                <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </SearchIcon>
              <SearchInput type="text" placeholder="Search domain..." />
            </SearchContainer>
            
            <Flex align="center">
              <span style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginRight: '0.25rem' }}>Owner:</span>
              <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>@anshulyadav32</span>
            </Flex>
          </Flex>
        </NavMenu>
      </NavContainer>
    </Nav>
  );
};

export default NavigationBar;