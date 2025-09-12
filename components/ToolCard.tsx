import React from 'react';
import Button from './Button';

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    onButtonClick: () => void;
}

const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, buttonText, onButtonClick }) => {
    return (
        <div className="flex flex-col justify-between p-6 bg-white dark:bg-background border border-gray-200 dark:border-secondary-accent rounded-xl transition-all duration-300 hover:border-gray-400/50 dark:hover:border-primary-accent/50">
            <div>
                <div className="flex items-center gap-4 mb-3">
                    <div className="bg-gray-100 dark:bg-secondary-accent p-2 rounded-lg">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-primary-text">{title}</h3>
                </div>
                <p className="text-sm text-gray-600 dark:text-secondary-text mb-6">
                    {description}
                </p>
            </div>
            <Button onClick={onButtonClick} variant="secondary">
                {buttonText}
            </Button>
        </div>
    );
};

export default ToolCard;