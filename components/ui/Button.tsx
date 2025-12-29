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
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-300 text-sm tracking-wide px-6 py-3 rounded-sm";
  
  const variants = {
    primary: "bg-brand-gold text-brand-dark hover:bg-white hover:text-brand-dark shadow-[0_0_15px_rgba(197,160,89,0.3)]",
    secondary: "bg-transparent border border-white/30 text-white hover:bg-white/10",
    outline: "bg-transparent border border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-dark",
    ghost: "text-brand-gold hover:text-white px-0"
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