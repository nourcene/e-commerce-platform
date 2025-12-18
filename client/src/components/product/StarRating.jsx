import React from 'react';
import { Star } from 'lucide-react';

const StarRating = ({ rating, maxRating = 5, size = 'md', showNumber = true, interactive = false, onRate }) => {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-5 h-5',
        lg: 'w-6 h-6'
    };

    const handleClick = (value) => {
        if (interactive && onRate) {
            onRate(value);
        }
    };

    return (
        <div className="flex items-center space-x-1">
            {[...Array(maxRating)].map((_, index) => {
                const starValue = index + 1;
                const isFilled = starValue <= Math.round(rating);

                return (
                    <button
                        key={index}
                        onClick={() => handleClick(starValue)}
                        disabled={!interactive}
                        className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                    >
                        <Star
                            className={`${sizeClasses[size]} ${isFilled
                                    ? 'fill-yellow-400 text-yellow-400'
                                    : 'text-gray-300 dark:text-gray-600'
                                }`}
                        />
                    </button>
                );
            })}
            {showNumber && (
                <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    {rating.toFixed(1)}
                </span>
            )}
        </div>
    );
};

export default StarRating;
