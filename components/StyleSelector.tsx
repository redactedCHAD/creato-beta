
import React from 'react';

interface StyleSelectorProps {
  styles: string[];
  selectedStyles: string[];
  onStyleToggle: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styles, selectedStyles, onStyleToggle }) => {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
      {styles.map(style => {
        const isSelected = selectedStyles.includes(style);
        return (
          <button
            key={style}
            onClick={() => onStyleToggle(style)}
            className={`px-4 py-3 rounded-lg text-sm font-semibold text-center transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white dark:focus:ring-offset-background focus:ring-gray-700 dark:focus:ring-primary-accent
              ${isSelected
                ? 'bg-gray-900 text-white shadow-lg dark:bg-primary-accent dark:text-background'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-secondary-accent dark:text-secondary-text dark:hover:bg-[#333] dark:hover:text-primary-text'
              }`}
          >
            {style}
          </button>
        );
      })}
    </div>
  );
};

export default StyleSelector;