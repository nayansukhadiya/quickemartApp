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
        let fetchedProducts = [];
        for (let cat of categories) {
          const response = await fetch(`json/${cat}.json`);
          if (!response.ok) {
            throw new Error(`Failed to fetch ${cat}: ${response.statusText}`);
          }
          const data = await response.json();
          // fetchedProducts = [...fetchedProducts, ...data];
          for(let i=0; i<data.length; i++){
            fetchedProducts.push({
                "pid": data[i].pid,
                "ProIDSearch": `rapidShop-${cat}-${i + 1}-${data[i].pid}`,
                "image": data[i].images?.[0] || null,
                "price": data[i].price,
                "title": data[i].title,
                "brand": data[i].brand,
                "catOfPro": `rapidShop-${cat}`
            },)
          }
        }
        console.log('Fetched products:', fetchedProducts);
        setAllProductData(fetchedProducts);
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
