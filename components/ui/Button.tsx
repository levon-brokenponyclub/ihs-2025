import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  children, 
  className = '', 
  icon,
  ...props 
}) => {
  // Base styles: Removed shadow, translate effects. Added basic color transition.
  const baseStyles = "inline-flex items-center justify-center font-semibold transition-colors duration-200 ease-out text-[11px] md:text-xs uppercase tracking-widest px-6 py-3 rounded-sm";
  
  const variants = {
    // Primary: Gold BG, Dark Text. Simple hover darken.
    primary: "bg-brand-accent text-brand-primary hover:bg-brand-goldHover",
    
    // Secondary: Bordered white/gold.
    secondary: "bg-transparent border border-white text-white hover:bg-white/10 hover:border-brand-gold",
    
    // Outline: Blue/Dark context usually
    outline: "bg-transparent border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-brand-primary",
    
    // Ghost: Simple text hover
    ghost: "text-brand-accent hover:text-white px-0"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};