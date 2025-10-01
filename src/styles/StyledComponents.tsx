import styled from 'styled-components';

// Layout Components
export const Container = styled.div<{ fluid?: boolean, size?: 'sm' | 'md' | 'lg' | 'xl' }>`
  width: 100%;
  margin: 0 auto;
  padding: 0 var(--space-sm);
  
  max-width: ${props => 
    props.fluid ? '100%' :
    props.size === 'sm' ? '640px' :
    props.size === 'lg' ? '1200px' :
    props.size === 'xl' ? '1400px' :
    '960px' // default 'md' size
  };
  
  @media (max-width: 576px) {
    padding: 0 var(--space-xs);
  }
`;

export const Row = styled.div<{ noGutter?: boolean, alignItems?: string, justifyContent?: string }>`
  display: flex;
  flex-wrap: wrap;
  margin: ${props => props.noGutter ? '0' : '0 -0.5rem'};
  align-items: ${props => props.alignItems || 'stretch'};
  justify-content: ${props => props.justifyContent || 'flex-start'};
  
  @media (max-width: 576px) {
    margin: ${props => props.noGutter ? '0' : '0 -0.25rem'};
  }
`;

export const Col = styled.div<{ 
  span?: number,
  sm?: number,
  md?: number,
  lg?: number,
  xl?: number,
  offset?: number
}>`
  flex: ${props => (props.span ? `0 0 ${(props.span / 12) * 100}%` : '1')};
  max-width: ${props => (props.span ? `${(props.span / 12) * 100}%` : '100%')};
  padding: 0 0.5rem;
  margin-left: ${props => props.offset ? `${(props.offset / 12) * 100}%` : '0'};

  @media (max-width: 576px) {
    flex: 0 0 ${props => props.sm ? `${(props.sm / 12) * 100}%` : '100%'};
    max-width: ${props => props.sm ? `${(props.sm / 12) * 100}%` : '100%'};
    padding: 0 0.25rem;
  }
  
  @media (min-width: 577px) and (max-width: 768px) {
    flex: 0 0 ${props => props.md ? `${(props.md / 12) * 100}%` : props.span ? `${(props.span / 12) * 100}%` : '100%'};
    max-width: ${props => props.md ? `${(props.md / 12) * 100}%` : props.span ? `${(props.span / 12) * 100}%` : '100%'};
  }
  
  @media (min-width: 769px) and (max-width: 992px) {
    flex: 0 0 ${props => props.lg ? `${(props.lg / 12) * 100}%` : props.span ? `${(props.span / 12) * 100}%` : '50%'};
    max-width: ${props => props.lg ? `${(props.lg / 12) * 100}%` : props.span ? `${(props.span / 12) * 100}%` : '50%'};
  }
  
  @media (min-width: 993px) {
    flex: 0 0 ${props => props.xl ? `${(props.xl / 12) * 100}%` : props.span ? `${(props.span / 12) * 100}%` : props.span ? `${(props.span / 12) * 100}%` : '33.333%'};
    max-width: ${props => props.xl ? `${(props.xl / 12) * 100}%` : props.span ? `${(props.span / 12) * 100}%` : props.span ? `${(props.span / 12) * 100}%` : '33.333%'};
  }
`;

// Card Components
export const Card = styled.div<{ noPadding?: boolean, compact?: boolean }>`
  background-color: var(--color-white);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  margin-bottom: var(--space-md);
  overflow: hidden;
  
  @media (max-width: 576px) {
    margin-bottom: var(--space-sm);
  }
`;

export const CardHeader = styled.div<{ noBorder?: boolean }>`
  padding: var(--space-sm) var(--space-md);
  border-bottom: ${props => props.noBorder ? 'none' : '1px solid var(--color-border)'};
  
  @media (max-width: 576px) {
    padding: var(--space-xs) var(--space-sm);
  }
`;

export const CardBody = styled.div<{ noPadding?: boolean }>`
  padding: ${props => props.noPadding ? '0' : 'var(--space-md)'};
  
  @media (max-width: 576px) {
    padding: ${props => props.noPadding ? '0' : 'var(--space-sm)'};
  }
`;

export const CardFooter = styled.div<{ noBorder?: boolean }>`
  padding: var(--space-sm) var(--space-md);
  border-top: ${props => props.noBorder ? 'none' : '1px solid var(--color-border)'};
  background-color: rgba(0, 0, 0, 0.02);
  
  @media (max-width: 576px) {
    padding: var(--space-xs) var(--space-sm);
  }
`;

// Button Components
export const Button = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning',
  size?: 'sm' | 'md' | 'lg'
}>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${props => 
    props.size === 'sm' ? '0.375rem 0.75rem' : 
    props.size === 'lg' ? '0.75rem 1.5rem' : 
    '0.5rem 1rem'
  };
  font-size: ${props => 
    props.size === 'sm' ? '0.875rem' : 
    props.size === 'lg' ? '1.125rem' : 
    '1rem'
  };
  font-weight: 500;
  line-height: 1.5;
  border-radius: var(--radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition: all 0.15s ease-in-out;
  
  background-color: ${props => 
    props.variant === 'primary' ? 'var(--color-primary)' :
    props.variant === 'success' ? 'var(--color-success)' :
    props.variant === 'danger' ? 'var(--color-danger)' :
    props.variant === 'warning' ? 'var(--color-warning)' :
    'transparent'
  };
  
  color: ${props => 
    props.variant === 'primary' || props.variant === 'success' || props.variant === 'danger' ? 'white' :
    props.variant === 'warning' ? 'var(--color-text)' :
    'var(--color-text)'
  };
  
  border-color: ${props => 
    props.variant === 'primary' ? 'var(--color-primary)' :
    props.variant === 'success' ? 'var(--color-success)' :
    props.variant === 'danger' ? 'var(--color-danger)' :
    props.variant === 'warning' ? 'var(--color-warning)' :
    'var(--color-border)'
  };
  
  &:hover, &:focus {
    opacity: 0.9;
    box-shadow: var(--shadow);
  }
  
  &:disabled {
    opacity: 0.65;
    cursor: not-allowed;
  }
`;

// Text Components
export const Heading = styled.h1<{ 
  size?: 1 | 2 | 3 | 4 | 5 | 6,
  align?: 'left' | 'center' | 'right',
  marginBottom?: string,
  color?: string
}>`
  margin-bottom: ${props => props.marginBottom || 'var(--space-sm)'};
  font-weight: 600;
  line-height: 1.2;
  text-align: ${props => props.align || 'left'};
  color: ${props => props.color || 'inherit'};
  
  /* Use CSS variables for responsive typography */
  font-size: ${props => 
    props.size === 1 ? 'var(--font-size-2xl)' :
    props.size === 2 ? 'var(--font-size-xl)' :
    props.size === 3 ? 'var(--font-size-lg)' :
    props.size === 4 ? 'var(--font-size-md)' :
    props.size === 5 ? 'var(--font-size-sm)' :
    'var(--font-size-sm)'
  };
  
  @media (max-width: 576px) {
    margin-bottom: ${props => props.marginBottom || 'var(--space-xs)'};
  }
`;

export const Text = styled.p<{ 
  size?: 'sm' | 'md' | 'lg', 
  muted?: boolean, 
  weight?: 'normal' | 'bold' | 'semibold' | 'light',
  align?: 'left' | 'center' | 'right',
  marginBottom?: string,
  truncate?: boolean,
  lineClamp?: number,
  color?: string
}>`
  margin-bottom: ${props => props.marginBottom || 'var(--space-sm)'};
  font-weight: ${props => 
    props.weight === 'bold' ? '700' :
    props.weight === 'semibold' ? '600' :
    props.weight === 'light' ? '300' :
    'normal'
  };
  text-align: ${props => props.align || 'left'};
  color: ${props => props.color || props.muted ? 'var(--color-text-secondary)' : 'inherit'};
  
  /* Use CSS variables for responsive typography */
  font-size: ${props => 
    props.size === 'sm' ? 'var(--font-size-xs)' :
    props.size === 'lg' ? 'var(--font-size-md)' :
    'var(--font-size-sm)'
  };
  
  /* Text truncation if needed */
  ${props => props.truncate && `
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  `}
  
  /* Line clamp for multiline truncation */
  ${props => props.lineClamp && `
    display: -webkit-box;
    -webkit-line-clamp: ${props.lineClamp};
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
  
  @media (max-width: 576px) {
    margin-bottom: ${props => props.marginBottom || 'var(--space-xs)'};
  }
`;

// Badge Component
export const Badge = styled.span<{ variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'subtle' }>`
  display: inline-block;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: var(--radius-full);
  
  background-color: ${props => 
    props.variant === 'primary' ? 'var(--color-primary-light)' :
    props.variant === 'success' ? 'rgba(16, 185, 129, 0.1)' :
    props.variant === 'danger' ? 'rgba(239, 68, 68, 0.1)' :
    props.variant === 'warning' ? 'rgba(245, 158, 11, 0.1)' :
    props.variant === 'info' ? 'rgba(59, 130, 246, 0.1)' :
    props.variant === 'subtle' ? 'rgba(229, 231, 235, 0.5)' :
    'rgba(107, 114, 128, 0.1)'
  };
  
  color: ${props => 
    props.variant === 'primary' ? 'var(--color-primary-dark)' :
    props.variant === 'success' ? 'var(--color-success)' :
    props.variant === 'danger' ? 'var(--color-danger)' :
    props.variant === 'warning' ? 'var(--color-warning)' :
    props.variant === 'info' ? 'rgb(59, 130, 246)' :
    props.variant === 'subtle' ? 'var(--color-text-secondary)' :
    'var(--color-text-secondary)'
  };
`;

// Form Components
export const Input = styled.input`
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-white);
  background-clip: padding-box;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: all 0.15s ease-in-out;
  
  &:focus {
    color: var(--color-text);
    background-color: var(--color-white);
    border-color: var(--color-primary);
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
  }
`;

export const Select = styled.select`
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--color-text);
  background-color: var(--color-white);
  background-clip: padding-box;
  border: 1px solid var(--color-border);
  border-radius: var(--radius);
  transition: all 0.15s ease-in-out;
  
  &:focus {
    border-color: var(--color-primary);
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(59, 130, 246, 0.25);
  }
`;

export const FormGroup = styled.div`
  margin-bottom: 1rem;
`;

export const Label = styled.label`
  display: inline-block;
  margin-bottom: 0.5rem;
  font-size: 0.875rem;
  font-weight: 500;
`;

// Navigation Components
export const Nav = styled.nav<{ fixed?: boolean, transparent?: boolean }>`
  background-color: ${props => props.transparent ? 'transparent' : 'var(--color-white)'};
  box-shadow: ${props => props.transparent ? 'none' : 'var(--shadow)'};
  position: ${props => props.fixed ? 'fixed' : 'relative'};
  top: ${props => props.fixed ? '0' : 'auto'};
  left: ${props => props.fixed ? '0' : 'auto'};
  right: ${props => props.fixed ? '0' : 'auto'};
  z-index: ${props => props.fixed ? '1000' : 'auto'};
  width: 100%;
  transition: background-color 0.3s ease, box-shadow 0.3s ease;
`;

export const NavContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  padding: var(--space-sm);
  max-width: 1200px;
  margin: 0 auto;
  
  @media (max-width: 576px) {
    padding: var(--space-xs);
  }
`;

export const NavBrand = styled.div`
  display: flex;
  align-items: center;
  font-size: var(--font-size-lg);
  font-weight: 600;
  color: var(--color-text);
`;

export const NavMenu = styled.div<{ open?: boolean }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  
  @media (max-width: 768px) {
    flex-direction: column;
    width: 100%;
    display: ${props => (props.open ? 'flex' : 'none')};
    margin-top: var(--space-sm);
    animation: ${props => props.open ? 'slideDown 0.3s ease forwards' : 'none'};
    
    @keyframes slideDown {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
  }
`;

export const NavItem = styled.a<{ active?: boolean }>`
  padding: var(--space-xs) var(--space-sm);
  color: ${props => props.active ? 'var(--color-primary)' : 'var(--color-text)'};
  text-decoration: none;
  position: relative;
  font-weight: ${props => props.active ? '600' : '400'};
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '30%' : '0'};
    height: 2px;
    background-color: var(--color-primary);
    transition: width 0.3s ease;
  }
  
  &:hover {
    color: var(--color-primary);
    
    &::after {
      width: 30%;
    }
  }
  
  @media (max-width: 768px) {
    width: 100%;
    padding: var(--space-xs) var(--space-sm);
    border-top: 1px solid var(--color-border);
    
    &::after {
      display: none;
    }
  }
`;

export const NavToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: var(--space-xs);
  
  @media (max-width: 768px) {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 30px;
    height: 21px;
  }
  
  span {
    display: block;
    height: 3px;
    width: 100%;
    background-color: var(--color-text);
    border-radius: 3px;
    transition: transform 0.3s ease;
    
    &:nth-child(1) {
      transform-origin: top left;
    }
    
    &:nth-child(3) {
      transform-origin: bottom left;
    }
  }
  
  &.open {
    span:nth-child(1) {
      transform: rotate(45deg) translate(1px, -1px);
    }
    
    span:nth-child(2) {
      opacity: 0;
    }
    
    span:nth-child(3) {
      transform: rotate(-45deg) translate(1px, 0px);
    }
  }
`;

// Table Components
export const Table = styled.table`
  width: 100%;
  margin-bottom: 1rem;
  color: var(--color-text);
  border-collapse: collapse;
`;

export const Thead = styled.thead`
  background-color: rgba(0, 0, 0, 0.02);
`;

export const Th = styled.th`
  padding: 0.75rem;
  vertical-align: bottom;
  border-bottom: 2px solid var(--color-border);
  text-align: left;
`;

export const Td = styled.td`
  padding: 0.75rem;
  vertical-align: top;
  border-top: 1px solid var(--color-border);
`;

export const Tr = styled.tr`
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
`;

// Divider Component
export const Divider = styled.hr<{ spacing?: 'sm' | 'md' | 'lg' }>`
  border: 0;
  height: 1px;
  background-color: var(--color-border);
  margin-top: ${props => 
    props.spacing === 'sm' ? '0.5rem' :
    props.spacing === 'lg' ? '1.5rem' :
    '1rem'
  };
  margin-bottom: ${props => 
    props.spacing === 'sm' ? '0.5rem' :
    props.spacing === 'lg' ? '1.5rem' :
    '1rem'
  };
`;

// Utility classes
export const Flex = styled.div<{ direction?: 'row' | 'column', justify?: string, align?: string, gap?: string }>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'stretch'};
  gap: ${props => props.gap || '0'};
`;

export const Spacer = styled.div<{ size?: string }>`
  margin-bottom: ${props => props.size || '1rem'};
`;

export const Grid = styled.div<{ 
  columns: number, 
  gap?: string,
  smColumns?: number,
  mdColumns?: number,
  lgColumns?: number,
  autoFit?: boolean,
  minWidth?: string
}>`
  display: grid;
  grid-template-columns: ${props => 
    props.autoFit 
      ? `repeat(auto-fit, minmax(${props.minWidth || '250px'}, 1fr))` 
      : `repeat(${props.columns}, 1fr)`
  };
  gap: ${props => props.gap || 'var(--space-md)'};
  
  @media (max-width: 576px) {
    grid-template-columns: ${props => 
      props.autoFit 
        ? `repeat(auto-fit, minmax(${props.minWidth || '250px'}, 1fr))` 
        : props.smColumns 
          ? `repeat(${props.smColumns}, 1fr)` 
          : '1fr'
    };
    gap: ${props => props.gap || 'var(--space-sm)'};
  }
  
  @media (min-width: 577px) and (max-width: 768px) {
    grid-template-columns: ${props => 
      props.autoFit 
        ? `repeat(auto-fit, minmax(${props.minWidth || '250px'}, 1fr))` 
        : props.mdColumns 
          ? `repeat(${props.mdColumns}, 1fr)` 
          : props.smColumns 
            ? `repeat(${props.smColumns}, 1fr)` 
            : `repeat(2, 1fr)`
    };
  }
  
  @media (min-width: 769px) and (max-width: 992px) {
    grid-template-columns: ${props => 
      props.autoFit 
        ? `repeat(auto-fit, minmax(${props.minWidth || '250px'}, 1fr))` 
        : props.lgColumns 
          ? `repeat(${props.lgColumns}, 1fr)` 
          : props.mdColumns 
            ? `repeat(${props.mdColumns}, 1fr)` 
            : `repeat(${Math.min(props.columns, 3)}, 1fr)`
    };
  }
`;

// Status indicator
export const StatusIndicator = styled.div<{ status: 'online' | 'offline' | 'pending' }>`
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 50%;
  display: inline-block;
  margin-right: 0.5rem;
  
  background-color: ${props => 
    props.status === 'online' ? 'var(--color-success)' :
    props.status === 'offline' ? 'var(--color-danger)' :
    'var(--color-warning)'
  };
  
  box-shadow: ${props => 
    props.status === 'online' ? '0 0 0 3px rgba(16, 185, 129, 0.2)' :
    props.status === 'offline' ? '0 0 0 3px rgba(239, 68, 68, 0.2)' :
    '0 0 0 3px rgba(245, 158, 11, 0.2)'
  };
`;