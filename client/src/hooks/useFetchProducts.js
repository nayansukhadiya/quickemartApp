import { useState, useEffect } from "react";

const useFetchProducts = () => {
  const categories = [
    'chips',      'chocolates', 'biscuit',
    'fruitJuice', 'noodle',     'softDrink',
    'fruits',     'vegetables', 'flour',
    'milk',       'syrup',      'tea',
    'coffee',     'cheese',     'paneer',
    'dairyCream', 'pavBun',     'masala',
    'chutneys',   'herb',       'paste',
    'baking',     'dryFruits'
  ];

  const [allProductData, setAllProductData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const fetchedProducts = [];
        const productIds = new Set(); // To track unique product IDs

        // for (let cat of categories) {
          const response = await fetch(`json/searchProduct.json`);
          if (!response.ok) {
            throw new Error(`Failed to fetch : ${response.statusText}`);
          }
          const data = await response.json();

          // for (let i = 0; i < data.length; i++) {
          //   const product = {
          //     "pid": data[i].pid,
          //     "ProIDSearch": `rapidShop-${cat}-${data[i].pid}`,
          //     "image": data[i].images?.[0] || null,
          //     "price": data[i].price,
          //     "title": data[i].title,
          //     "brand": data[i].brand,
          //     "subTitle": data[i].subTitle,
          //     "catOfPro": `rapidShop-${cat}`
          //   };

          //   // Check if product ID is already in the Set
          //   if (!productIds.has(product.pid)) {
          //     productIds.add(product.pid); // Add ID to Set
          //     fetchedProducts.push(product); // Add unique product to the array
          //   }
          // }
        // }
        
        console.log('Fetched products:', data);
        setAllProductData(data);
      } catch (err) {
        console.error('Fetching error:', err);
        setError(err.message || "Error fetching data");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { allProductData, loading, error };
};

export default useFetchProducts;
