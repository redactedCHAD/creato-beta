import React from 'react';
import Header from '../components/Header';
import ToolCard from '../components/ToolCard';
import type { Tool } from '../types';

interface DashboardProps {
    onNavClick: (tool: Tool) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onNavClick }) => {
    return (
        <div className="w-full max-w-7xl mx-auto space-y-8 animate-fade-in">
            <Header
                title="ContentCore"
                subtitle="Your marketing command center. Create content and visualize your strategy."
            />
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <ToolCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>}
                    title="Ad Creative Generator"
                    description="Transform product photos into stunning, styled ad images and videos using generative AI."
                    buttonText="Create Ad ✨"
                    onButtonClick={() => onNavClick('ad-generator')}
                    colorScheme="purple"
                />
                <ToolCard 
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" /><path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clipRule="evenodd" /></svg>}
                    title="Social Post Writer"
                    description="Generate engaging social media posts, from short tweets to full blog articles, in any tone."
                    buttonText="Write Post ✍️"
                    onButtonClick={() => onNavClick('social-posts')}
                    colorScheme="blue"
                />
                 <ToolCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg>}
                    title="GBP Optimizer"
                    description="Generate compelling, SEO-friendly descriptions for your business and services to improve local search visibility."
                    buttonText="Optimize GBP 📈"
                    onButtonClick={() => onNavClick('gbp-optimizer')}
                    colorScheme="green"
                />
                <ToolCard
                    icon={<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" /></svg>}
                    title="Content Calendar"
                    description="Plan, schedule, and visualize your entire content strategy across all platforms in one place."
                    buttonText="View Calendar 🗓️"
                    onButtonClick={() => onNavClick('content-calendar')}
                    colorScheme="orange"
                />
            </div>
        </div>
    );
};

export default Dashboard;