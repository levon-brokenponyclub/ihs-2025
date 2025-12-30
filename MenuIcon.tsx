import React from 'react';

interface MenuIconProps {
  isOpen: boolean;
  toggle: () => void;
  className?: string;
}

const MenuIcon: React.FC<MenuIconProps> = ({ isOpen, toggle, className = '' }) => {
  return (
    <button
      onClick={toggle}
      className={`group relative z-50 flex h-12 w-12 flex-col items-center justify-center border-none bg-transparent p-0 focus:outline-none ${className}`}
      aria-label="Toggle Menu"
    >
      {/* Top Line */}
      <span
        className={`block h-0.5 w-6 bg-current transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-y-[5px] rotate-45' : '-translate-y-1'
        }`}
      />
      
      {/* Middle Line */}
      <span
        className={`block h-0.5 w-6 bg-current transition-opacity duration-300 ease-in-out ${
          isOpen ? 'opacity-0' : 'opacity-100'
        }`}
      />
      
      {/* Bottom Line */}
      <span
        className={`block h-0.5 w-6 bg-current transition-transform duration-300 ease-in-out ${
          isOpen ? '-translate-y-[5px] -rotate-45' : 'translate-y-1'
        }`}
      />
    </button>
  );
};

export default MenuIcon;