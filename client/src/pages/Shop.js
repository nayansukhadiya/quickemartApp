import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import '../style/home.css';
import '../style/shop.css';

function Shop() {
  const [categoryArr, setCategoryArr] = useState([]);
  const [urlId, setUrlId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(30);
  const [sortOrder, setSortOrder] = useState('Relative');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    setUrlId(id); 
    paginate(1);
  }, [location.search]);

  useEffect(() => {
    if(sortOrder === 'Relative'){

      if (urlId) {
        fetch(`json/${urlId}.json`)
        .then(response => response.json())
        .then((data) => {
          setCategoryArr(data.products);
        });
      }
    }
  }, [sortOrder]);
  useEffect(() => {
    if (urlId) {
      fetch(`json/${urlId}.json`)
        .then(response => response.json())
        .then((data) => {
          setCategoryArr(data.products);
        });
    }
  }, [urlId]);

  const sortArr = (order) => {
    let sortedArr = [...categoryArr];
    if (order === 'asc') {
      sortedArr = sortedArr.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sortedArr = sortedArr.sort((a, b) => b.price - a.price);
    }
    setCategoryArr(sortedArr);
    paginate(1);
  };

  useEffect(() => {
    if (sortOrder !== 'Relative') {
      sortArr(sortOrder);
    }
  }, [sortOrder]);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryArr.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(categoryArr.length / productsPerPage);

  const goToPrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div>
      <h1>Shop</h1>
      <div className='upperSecShop'>
        <h5>{categoryArr.length} Product Found</h5>

    
      <div className="dropdown">
        <button className="dropbtn">Sort by Price</button>
        <div className="dropdown-content">
          <button onClick={() => setSortOrder('Relative')}>Relative</button>
          <button onClick={() => setSortOrder('asc')}>Price: Low to High</button>
          <button onClick={() => setSortOrder('desc')}>Price: High to Low</button>
      </div>
        </div>
      </div>

      <div className="shop-cards">
        {currentProducts.map((item, index) => (
          <HomeCard
            key={index}
            img={item.images[0]}
            name={item.title}
            mrp={item.mrp}
            price={item.price}
          />
        ))}
      </div>
      <div className="pagination">
        <button 
          onClick={goToPrevious} 
          disabled={currentPage === 1}
        >
          &lt;
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (
          <button 
            key={number} 
            onClick={() => paginate(number)}
            className={number === currentPage ? 'active' : ''}
          >
            {number}
          </button>
        ))}
        <button 
          onClick={goToNext} 
          disabled={currentPage === totalPages}
        >
          &gt;
        </button>
      </div>
    </div>
  );
}

export default Shop;
