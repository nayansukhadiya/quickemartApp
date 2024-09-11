import React, { useState } from 'react';
import "../style/productDetail.css";

function ProDetailPage() {
  // State to keep track of the main image source
  const [mainImage, setMainImage] = useState('https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/full_screen/pro_68554.jpg?ts=1701174619');

  // List of images to show in the more images section
  const images = [
    'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/sliding_image/68554d.jpg?ts=1701174619',
    'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/full_screen/pro_68554.jpg?ts=1701174619',
    'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/full_screen/pro_68554.jpg?ts=1701174619',
    'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/full_screen/pro_68554.jpg?ts=1701174619',
    'https://cdn.grofers.com/cdn-cgi/image/f=auto,fit=scale-down,q=85,metadata=none,w=120,h=120/app/images/products/full_screen/pro_68554.jpg?ts=1701174619'
  ];

  return (
    <>
      <div className='detailMain'>
        <div className='img-section'>
          <div className='mainImg'>
            <img src={mainImage} alt='Main product' />
          </div>

          <div className='moreImg'>
            {images.map((imgSrc, index) => (
              <img
                key={index}
                src={imgSrc}
                alt={`Product thumbnail ${index}`}
                onClick={() => setMainImage(imgSrc)} 
                className="thumbnail-img"
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default ProDetailPage;
