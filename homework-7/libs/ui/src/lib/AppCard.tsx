import React from 'react';
import './AppCard.css';

interface AppCardProps {
  children: React.ReactNode;
  title?: string;
  className?: string;
}

export const AppCard: React.FC<AppCardProps> = ({ children, title, className = '' }) => {
  return (
    <div className={`app-card ${className}`}>
      {title && <h3 className="app-card__title">{title}</h3>}
      <div className="app-card__content">
        {children}
      </div>
    </div>
  );
};