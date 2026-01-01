
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
  // Base styles: Added tracking-[1px]
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase transition-colors duration-300 rounded-sm text-xs px-6 py-3 shadow-none tracking-[1px]";
  
  const variants = {
    // Primary: Gold BG, White Text
    primary: "bg-brand-accent text-white hover:bg-brand-goldHover",
    
    // Secondary: Bordered white/gold
    secondary: "bg-transparent border border-white text-white hover:bg-white/10 hover:border-brand-gold",
    
    // Outline: Blue/Dark context usually
    outline: "bg-transparent border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white",
    
    // Ghost: Simple text hover
    ghost: "text-brand-accent hover:text-white !px-0 !py-0"
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
