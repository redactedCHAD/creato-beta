import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'primary', className, ...props }) => {
  const baseClasses = "w-full font-bold py-3 px-6 rounded-lg transition-all duration-200 ease-in-out disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-background";
  
  const primaryClasses = "bg-gray-900 text-white hover:scale-105 transform focus:ring-gray-900/50 dark:bg-primary-accent dark:text-background dark:focus:ring-primary-accent/50";
  
  const secondaryClasses = "bg-transparent text-gray-800 border border-gray-800 hover:bg-gray-800 hover:text-white focus:ring-gray-800 dark:text-primary-text dark:border-primary-text dark:hover:bg-primary-accent dark:hover:text-background dark:focus:ring-primary-accent";

  const classes = `${baseClasses} ${variant === 'primary' ? primaryClasses : secondaryClasses} ${className || ''}`;
  
  return (
    <button
      {...props}
      className={classes}
    >
      {children}
    </button>
  );
};

export default Button;