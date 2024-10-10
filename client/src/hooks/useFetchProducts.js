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
