import React from 'react';

const StarRating = ({ rating }) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;

    return (
        <div className="fs-16 align-middle text-warning">
            {[...Array(fullStars)].map((_, index) => (
                <i key={`full-${index}`} className="ri-star-fill"></i>
            ))}
            {halfStars === 1 && <i className="ri-star-half-fill"></i>}
            {[...Array(emptyStars)].map((_, index) => (
                <i key={`empty-${index}`} className="ri-star-line"></i>
            ))}
        </div>
    );
};

export default StarRating;
