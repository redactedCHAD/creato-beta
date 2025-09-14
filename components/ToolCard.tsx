import React from 'react';
import Button from './Button';

interface ToolCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    buttonText: string;
    onButtonClick: () => void;
    colorScheme?: 'purple' | 'blue' | 'green' | 'orange';
}

const colorStyles = {
    purple: {
        iconContainer: 'bg-purple-100 dark:bg-accent/20',
        icon: 'text-accent dark:text-purple-400',
        bg: 'bg-purple-100/60 dark:bg-accent/20',
        glowStart: 'rgba(139, 92, 246, 0.3)',
        glowEnd: 'rgba(139, 92, 246, 0.6)',
    },
    blue: {
        iconContainer: 'bg-blue-100 dark:bg-accent-blue/20',
        icon: 'text-accent-blue dark:text-blue-400',
        bg: 'bg-blue-100/60 dark:bg-accent-blue/20',
        glowStart: 'rgba(59, 130, 246, 0.3)',
        glowEnd: 'rgba(59, 130, 246, 0.6)',
    },
    green: {
        iconContainer: 'bg-emerald-100 dark:bg-accent-green/20',
        icon: 'text-accent-green dark:text-emerald-400',
        bg: 'bg-emerald-100/60 dark:bg-accent-green/20',
        glowStart: 'rgba(16, 185, 129, 0.3)',
        glowEnd: 'rgba(16, 185, 129, 0.6)',
    },
    orange: {
        iconContainer: 'bg-orange-100 dark:bg-orange-500/20',
        icon: 'text-orange-500 dark:text-orange-400',
        bg: 'bg-orange-100/60 dark:bg-orange-500/20',
        glowStart: 'rgba(249, 115, 22, 0.3)',
        glowEnd: 'rgba(249, 115, 22, 0.6)',
    }
};


const ToolCard: React.FC<ToolCardProps> = ({ icon, title, description, buttonText, onButtonClick, colorScheme = 'purple' }) => {
    const styles = colorStyles[colorScheme];

    return (
        <div 
            style={{ 
                '--glow-color-start': styles.glowStart,
                '--glow-color-end': styles.glowEnd 
            } as React.CSSProperties}
            className={`tool-card relative overflow-hidden flex flex-col justify-between p-6 border border-gray-200 dark:border-secondary-accent rounded-xl transition-all duration-300 ${styles.bg}`}
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