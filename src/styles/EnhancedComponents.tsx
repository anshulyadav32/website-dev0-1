import React from 'react';
import styled from 'styled-components';

// Enhanced Button Component with loading state
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  style?: React.CSSProperties;
}

export const EnhancedButton = styled.button<{ 
  variant?: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'outline';
  size?: 'sm' | 'md' | 'lg';
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
    props.variant === 'secondary' ? 'var(--color-white)' :
    props.variant === 'success' ? 'var(--color-success)' :
    props.variant === 'danger' ? 'var(--color-danger)' :
    props.variant === 'warning' ? 'var(--color-warning)' :
    props.variant === 'outline' ? 'transparent' :
    'var(--color-primary)'
  };
  
  color: ${props => 
    props.variant === 'primary' ? 'white' :
    props.variant === 'secondary' ? 'var(--color-text)' :
    props.variant === 'success' ? 'white' :
    props.variant === 'danger' ? 'white' :
    props.variant === 'warning' ? 'var(--color-text)' :
    props.variant === 'outline' ? 'var(--color-primary)' :
    'white'
  };
  
  border-color: ${props => 
    props.variant === 'primary' ? 'var(--color-primary)' :
    props.variant === 'secondary' ? 'var(--color-border)' :
    props.variant === 'success' ? 'var(--color-success)' :
    props.variant === 'danger' ? 'var(--color-danger)' :
    props.variant === 'warning' ? 'var(--color-warning)' :
    props.variant === 'outline' ? 'var(--color-primary)' :
    'var(--color-primary)'
  };
  
  &:hover, &:focus {
    opacity: 0.9;
    box-shadow: var(--shadow);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const LoadingSpinner = styled.span`
  display: inline-block;
  width: 1em;
  height: 1em;
  margin-right: 0.5rem;
  border: 2px solid currentColor;
  border-right-color: transparent;
  border-radius: 50%;
  animation: spin 0.75s linear infinite;
  
  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

export const EnhancedFlexbox = styled.div<{
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  wrap?: boolean;
  gap?: string;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  reverseOnMobile?: boolean;
  spaceBetween?: string;
  fullWidth?: boolean;
  mobileGap?: string;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  justify-content: ${props => props.justify || 'flex-start'};
  align-items: ${props => props.align || 'flex-start'};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
  gap: ${props => props.gap || '0'};
  width: ${props => props.fullWidth ? '100%' : 'auto'};
  
  & > * {
    margin-right: ${props => props.spaceBetween || '0'};
    
    &:last-child {
      margin-right: 0;
    }
  }
  
  ${props => props.breakpoint === 'sm' && `
    @media (max-width: 576px) {
      flex-direction: ${props.reverseOnMobile ? 'column-reverse' : 'column'};
      gap: ${props.mobileGap || props.gap || 'var(--space-sm)'};
      
      & > * {
        margin-right: 0;
        width: ${props.fullWidth ? '100%' : 'auto'};
        margin-bottom: ${props.spaceBetween || '0'};
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  `}
  
  ${props => props.breakpoint === 'md' && `
    @media (max-width: 768px) {
      flex-direction: ${props.reverseOnMobile ? 'column-reverse' : 'column'};
      gap: ${props.mobileGap || props.gap || 'var(--space-sm)'};
      
      & > * {
        margin-right: 0;
        width: ${props.fullWidth ? '100%' : 'auto'};
        margin-bottom: ${props.spaceBetween || '0'};
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  `}
  
  ${props => props.breakpoint === 'lg' && `
    @media (max-width: 992px) {
      flex-direction: ${props.reverseOnMobile ? 'column-reverse' : 'column'};
      gap: ${props.mobileGap || props.gap || 'var(--space-md)'};
      
      & > * {
        margin-right: 0;
        width: ${props.fullWidth ? '100%' : 'auto'};
        margin-bottom: ${props.spaceBetween || '0'};
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  `}
  
  ${props => props.breakpoint === 'xl' && `
    @media (max-width: 1200px) {
      flex-direction: ${props.reverseOnMobile ? 'column-reverse' : 'column'};
      gap: ${props.mobileGap || props.gap || 'var(--space-md)'};
      
      & > * {
        margin-right: 0;
        width: ${props.fullWidth ? '100%' : 'auto'};
        margin-bottom: ${props.spaceBetween || '0'};
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  `}
`;

export const EnhancedHeading = styled.h1<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  color?: string;
  align?: 'left' | 'center' | 'right';
  marginBottom?: string;
  responsive?: boolean;
}>`
  font-weight: 700;
  line-height: 1.2;
  color: ${props => props.color || 'var(--color-heading)'};
  margin-top: 0;
  margin-bottom: ${props => props.marginBottom || 'var(--space-sm)'};
  text-align: ${props => props.align || 'left'};
  
  ${props => {
    switch (props.level) {
      case 1:
        return `
          font-size: var(--font-size-2xl);
          @media (max-width: 768px) {
            font-size: 2rem;
          }
          @media (max-width: 576px) {
            font-size: 1.75rem;
          }
        `;
      case 2:
        return `
          font-size: var(--font-size-xl);
          @media (max-width: 768px) {
            font-size: 1.75rem;
          }
          @media (max-width: 576px) {
            font-size: 1.5rem;
          }
        `;
      case 3:
        return `
          font-size: var(--font-size-lg);
          @media (max-width: 768px) {
            font-size: 1.5rem;
          }
          @media (max-width: 576px) {
            font-size: 1.25rem;
          }
        `;
      case 4:
        return `
          font-size: var(--font-size-md);
          @media (max-width: 768px) {
            font-size: 1.25rem;
          }
          @media (max-width: 576px) {
            font-size: 1.125rem;
          }
        `;
      case 5:
        return `
          font-size: var(--font-size-sm);
          @media (max-width: 768px) {
            font-size: 1.125rem;
          }
          @media (max-width: 576px) {
            font-size: 1rem;
          }
        `;
      case 6:
        return `
          font-size: var(--font-size-xs);
          @media (max-width: 768px) {
            font-size: 1rem;
          }
          @media (max-width: 576px) {
            font-size: 0.875rem;
          }
        `;
      default:
        return `
          font-size: var(--font-size-lg);
          @media (max-width: 768px) {
            font-size: 1.5rem;
          }
          @media (max-width: 576px) {
            font-size: 1.25rem;
          }
        `;
    }
  }}
`;

export const EnhancedGrid = styled.div<{
  columns?: number;
  gap?: string;
  autoFit?: boolean;
  minColumnWidth?: string;
  smColumns?: number;
  mdColumns?: number;
  lgColumns?: number;
  mobileGap?: string;
}>`
  display: grid;
  gap: ${props => props.gap || 'var(--space-md)'};
  
  ${props => props.autoFit && props.minColumnWidth
    ? `grid-template-columns: repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr));`
    : props.columns
    ? `grid-template-columns: repeat(${props.columns}, 1fr);`
    : 'grid-template-columns: 1fr;'
  }
  
  @media (max-width: 576px) {
    grid-template-columns: ${props => 
      props.autoFit && props.minColumnWidth
        ? `repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr))`
        : props.smColumns 
          ? `repeat(${props.smColumns}, 1fr)` 
          : '1fr'
    };
    gap: ${props => props.mobileGap || props.gap || 'var(--space-sm)'};
  }
  
  @media (min-width: 577px) and (max-width: 768px) {
    grid-template-columns: ${props => 
      props.autoFit && props.minColumnWidth
        ? `repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr))`
        : props.mdColumns 
          ? `repeat(${props.mdColumns}, 1fr)` 
          : props.smColumns 
            ? `repeat(${props.smColumns}, 1fr)` 
            : props.columns && props.columns > 2 
              ? 'repeat(2, 1fr)' 
              : props.columns 
                ? `repeat(${props.columns}, 1fr)` 
                : '1fr'
    };
  }
  
  @media (min-width: 769px) and (max-width: 992px) {
    grid-template-columns: ${props => 
      props.autoFit && props.minColumnWidth
        ? `repeat(auto-fit, minmax(${props.minColumnWidth}, 1fr))`
        : props.lgColumns 
          ? `repeat(${props.lgColumns}, 1fr)` 
          : props.mdColumns 
            ? `repeat(${props.mdColumns}, 1fr)` 
            : props.columns && props.columns > 3 
              ? 'repeat(3, 1fr)' 
              : props.columns 
                ? `repeat(${props.columns}, 1fr)` 
                : '1fr'
    };
  }
`;

// Export the enhanced Button component with loading state
export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  children,
  onClick,
  type = 'button',
  disabled = false,
  style
}) => {
  return (
    <EnhancedButton
      variant={variant}
      size={size}
      onClick={onClick}
      type={type}
      disabled={disabled || isLoading}
      style={style}
    >
      {isLoading && <LoadingSpinner />}
      {children}
    </EnhancedButton>
  );
};

// Heading component with level prop
export const Heading: React.FC<{
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  color?: string;
  style?: React.CSSProperties;
}> = ({ level = 2, children, color, style }) => {
  return (
    <EnhancedHeading level={level} color={color} as={`h${level}` as any} style={style}>
      {children}
    </EnhancedHeading>
  );
};

// Enhanced Flex component with additional props
export const Flex: React.FC<{
  children: React.ReactNode;
  direction?: 'row' | 'column';
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  wrap?: boolean;
  gap?: string;
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
  style?: React.CSSProperties;
}> = ({
  children,
  direction,
  justify,
  align,
  wrap,
  gap,
  breakpoint,
  style
}) => {
  return (
    <EnhancedFlexbox
      direction={direction}
      justify={justify}
      align={align}
      wrap={wrap}
      gap={gap}
      breakpoint={breakpoint}
      style={style}
    >
      {children}
    </EnhancedFlexbox>
  );
};

// Enhanced Grid component with additional props
export const Grid: React.FC<{
  children: React.ReactNode;
  columns?: number;
  gap?: string;
  autoFit?: boolean;
  minColumnWidth?: string;
  style?: React.CSSProperties;
}> = ({
  children,
  columns = 1,
  gap,
  autoFit,
  minColumnWidth,
  style
}) => {
  return (
    <EnhancedGrid
      columns={columns}
      gap={gap}
      autoFit={autoFit}
      minColumnWidth={minColumnWidth}
      style={style}
    >
      {children}
    </EnhancedGrid>
  );
};