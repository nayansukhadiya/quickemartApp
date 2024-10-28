import React from 'react';
import SkeletonCard from './SkeletonCard';

function SkeletonSec() {
    return (
        <>
            {Array.from({ length: 28 }, (_, index) => (
                <SkeletonCard key={index} />
            ))}
        </>
    );
}

export default SkeletonSec;
