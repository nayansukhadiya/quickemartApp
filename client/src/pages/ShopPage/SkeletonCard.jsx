import React from 'react'
import './SkeletonLoader.css';
function SkeletonCard() {
  return (
    <div className=" skeleton-loader">
    <div className="skeletonBg skeleton-img"></div>
    <div className=" skeleton-content">
        <div className="skeletonBg skeleton-text skeleton-header"></div>
    <div className="skeletonBg skeleton-header2"></div>
        <div className="skeletonBg skeleton-text"></div>
        <div className="skeletonBg skeleton-text skeleton-price"></div>
        <div className="skeletonBg skeleton-text skeleton-brand"></div>
    </div>
</div>
  )
}

export default SkeletonCard