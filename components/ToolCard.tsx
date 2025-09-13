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
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="glow-card relative overflow-hidden flex flex-col justify-between p-6 bg-white dark:bg-background border border-gray-200 dark:border-secondary-accent rounded-xl transition-all duration-300 hover:border-accent/80 hover:scale-[1.02] transform"
        >
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