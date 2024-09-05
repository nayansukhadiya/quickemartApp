import { useState, useEffect } from "react";

const useFetchProducts = () => {
  const categories = [
    "vegetables", "fruits", "chips", "milk", "chocolates",
    "noodle", "fruitJuice", "flour", "softDrink", "tea", "syrup"
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
          const data = await response.json();
          fetchedProducts = [...fetchedProducts, ...data.products];
        }
        setAllProductData(fetchedProducts);
      } catch (err) {
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
