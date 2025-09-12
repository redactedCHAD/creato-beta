import React from 'react';

interface HeaderProps {
    title: React.ReactNode;
    subtitle: string;
}

const Header: React.FC<HeaderProps> = ({ title, subtitle }) => {
  return (
    <header className="mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-primary-text">
        {title}
      </h1>
      <p className="mt-2 text-md text-gray-600 dark:text-secondary-text">
        {subtitle}
      </p>
    </header>
  );
};

export default Header;