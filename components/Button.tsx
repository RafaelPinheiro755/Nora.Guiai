import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'dark';
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "py-4 px-10 rounded-full font-semibold uppercase tracking-wider transition-all duration-300 transform hover:-translate-y-1 shadow-lg text-sm md:text-base";
  
  let variantStyles = "";
  
  switch (variant) {
    case 'primary':
      variantStyles = "bg-gradient-to-br from-gold to-gold-light text-white shadow-gold/40 hover:shadow-gold/50 border-none";
      break;
    case 'secondary':
      variantStyles = "bg-sand-dark text-white hover:bg-sand shadow-sand/40";
      break;
    case 'dark':
      variantStyles = "bg-navy text-white hover:bg-navy-light shadow-navy/40";
      break;
  }

  return (
    <button 
      className={`${baseStyles} ${variantStyles} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;