
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gold' | 'outline-gold';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  icon,
  ...props
}) => {
  // Base styles: tracking-[1px], rounded-sm
  const baseStyles = "inline-flex items-center justify-center font-bold uppercase transition-all duration-300 rounded-sm shadow-none tracking-[1px]";

  const variants = {
    // Brand Blue - Standard
    primary: "bg-brand-primary text-white hover:bg-[#001f38] border border-brand-primary",
    secondary: "bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",
    outline: "bg-transparent border border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white",

    // Brand Gold - For dark/blue backgrounds
    gold: "bg-brand-accent text-white hover:bg-brand-goldHover border border-brand-accent",
    "outline-gold": "bg-transparent border border-brand-accent text-brand-accent hover:bg-brand-accent hover:text-white",

    // Ghost: Simple text
    ghost: "text-brand-primary hover:text-brand-gold !px-0 !py-0"
  };

  const sizes = {
    sm: "text-[10px] px-4 py-2",
    md: "text-xs px-6 py-4",
    lg: "text-sm px-8 py-4",
    xl: "text-base px-10 py-5"
  };

  return (
    <button
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
      {icon && <span className="ml-2">{icon}</span>}
    </button>
  );
};
