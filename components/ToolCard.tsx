import React from 'react';
import Button from './Button';

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    onButtonClick: () => void;
    colorScheme?: 'purple' | 'blue' | 'green';
}

const colorStyles = {
    purple: {
        iconContainer: 'bg-gray-100 dark:bg-secondary-accent',
        icon: 'text-gray-800 dark:text-primary-text',
        borderHover: 'hover:border-accent/80',
        glow: 'rgba(139, 92, 246, 0.15)',
    },
    blue: {
        iconContainer: 'bg-blue-100 dark:bg-accent-blue/20',
        icon: 'text-accent-blue dark:text-blue-400',
        borderHover: 'hover:border-accent-blue/80',
        glow: 'rgba(59, 130, 246, 0.15)',
    },
    green: {
        iconContainer: 'bg-emerald-100 dark:bg-accent-green/20',
        icon: 'text-accent-green dark:text-emerald-400',
        borderHover: 'hover:border-accent-green/80',
        glow: 'rgba(16, 185, 129, 0.15)',
    }
};


const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, buttonText, onButtonClick, colorScheme = 'purple' }) => {
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        e.currentTarget.style.setProperty('--mouse-x', `${x}px`);
        e.currentTarget.style.setProperty('--mouse-y', `${y}px`);
    };

    const styles = colorStyles[colorScheme];

    return (
        <div 
            onMouseMove={handleMouseMove}
            style={{ '--glow-color': styles.glow } as React.CSSProperties}
            className={`glow-card relative overflow-hidden flex flex-col justify-between p-6 bg-white dark:bg-background border border-gray-200 dark:border-secondary-accent rounded-xl transition-all duration-300 transform hover:scale-[1.02] ${styles.borderHover}`}
        >
            <div>
                <div className="flex items-center gap-4 mb-3">
                    <div className={`${styles.iconContainer} p-2 rounded-lg`}>
                        {/* FIX: Explicitly cast the icon to a ReactElement with a className prop to satisfy TypeScript's strict checking for cloneElement. */}
                        {React.cloneElement(icon as React.ReactElement<{ className: string }>, { className: `h-6 w-6 ${styles.icon}` })}
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