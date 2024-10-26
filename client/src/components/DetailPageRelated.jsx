import React, { useEffect, useState } from 'react';
import config from '../config';
import HomeCard from './HomeCard';
import '../style/detailPageRelated.css'

function DetailPageRelated({ related_search_value, name }) {
  const [brand, setBrand] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("api is the ",`${config.apiUrl}/related/${related_search_value}`)
    const fetchBrands = async () => {
      try {
        const response = await fetch(`${config.apiUrl}/related/${related_search_value}`); // Use related_search_value directly
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log({name},data)
        setBrand(data); // Set the fetched data into the brand state
      } catch (error) {
        console.error('Error fetching brands:', error);
        setError(error.message); // Set error message for display
      } finally {
        setLoading(false); // Set loading to false regardless of success or error
      }
    };

    fetchBrands();
  }, [related_search_value,name]); // Re-fetch if related_search_value changes

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error: {error}</div>; // Error state
  }

  return (
    <div className='detailPageRelatedComponent'>
      <h2>{name}</h2>
      {brand.length === 0 ? (
        <p>No related brands found.</p>
      ) : (
        <div className='detailPageRelatedSec'>
          {brand.slice(0,12).map((item) => (
             <HomeCard
             key={item.p_id}
             ProIDSearch={item.p_id}
             img={item.img}
             name={item.name}
             price={item.price}
             mrp={item.mrp}
             unit={item.unit}
             category={item.category}
             discount={item.discount}
             brand={item.brand}
           />
          ))}
        </div>
      )}
    </div>
  );
}

export default DetailPageRelated;
