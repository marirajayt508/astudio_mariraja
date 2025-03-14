import React from 'react';

interface CategoryTabsProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
}) => {
  return (
    <div className="mb-4">
      <ul className="flex space-x-4">
        {categories.map((category) => (
          <li
            key={category}
            className={`cursor-pointer px-4 py-2 rounded-md font-medium transition-colors ${
              activeCategory === category 
                ? 'bg-custom-blue text-custom-black' 
                : 'bg-custom-grey text-custom-black hover:bg-custom-yellow'
            }`}
            onClick={() => onCategoryChange(category)}
          >
            {category.toUpperCase()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryTabs;
