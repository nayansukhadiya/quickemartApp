import React, { useEffect, useState } from 'react';
import config from '../config';
import '../style/relatedBrand.css'
import { Link } from 'react-router-dom';

function RelatedBrand({ category, brandName }) {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/brand?related_brand=${category}&brand=${brandName}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        setBrand(data);
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError(error.message); // Set error message for display
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchBrands();
  }, [category,brandName]); // Re-fetch if category changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className='relatedComponents'>
      <h2>Brands in that category</h2>
      {brand.length === 0 ? (
        <p>No related brands found.</p>
      ) : (
        <div  className='relatedBrandSec'>
          {brand.slice(0, 16).map((item) => (
        <Link to={`/search?q=${item}`} className='cardBrand'>
            <img
            title={item}
              key={item} // Ensure unique key, if item is not unique consider using a unique identifier
              src={require(`../assets/BrandLogo/${item.toLowerCase().replace(/ /g, "_")}.png`)}
              alt={item}
              onError={(e) => {
                e.target.onerror = null; // Prevents infinite loop
                e.target.src = '../assets/BrandLogo/default.png'; // Fallback image
              }}
            />
            <h6>{item}</h6>
        </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default RelatedBrand;
