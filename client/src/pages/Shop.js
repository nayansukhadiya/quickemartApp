import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomeCard from '../components/HomeCard';
import '../style/home.css';
import '../style/shop.css';
import ShopSideNav from '../components/ShopSideNav';

function Shop() {
  const [categoryArr, setCategoryArr] = useState([]);
  const [urlId, setUrlId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(28);
  const [sortOrder, setSortOrder] = useState('Relative');
  const location = useLocation();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const id = queryParams.get('id');
    setUrlId(id);
    setCurrentPage(1); // Reset to the first page on URL change
  }, [location.search]);

  useEffect(() => {
    const fetchData = async () => {
      if (urlId) {
        const response = await fetch(`json/${urlId}.json`);
        const data = await response.json();
        if (sortOrder === 'Relative') {
          setCategoryArr(data);
        } else {
          sortArr(data, sortOrder);
        }
      }
    };
    fetchData();
  }, [urlId, sortOrder]);

  const sortArr = (data, order) => {
    let sortedArr = [...data];
    if (order === 'asc') {
      sortedArr = sortedArr.sort((a, b) => a.price - b.price);
    } else if (order === 'desc') {
      sortedArr = sortedArr.sort((a, b) => b.price - a.price);
    }
    setCategoryArr(sortedArr);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = categoryArr.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const totalPages = Math.ceil(categoryArr.length / productsPerPage);
console.log(currentProducts)
  return (
    <>
      <div>
        <h1>Shop</h1>
        <div className='upperSecShop'>
          <h5>{categoryArr.length} Product(s) Found</h5>
          <div className="dropdown">
            <button className="dropbtn">Sort by Price</button>
            <div className="dropdown-content">
              <button onClick={() => setSortOrder('Relative')}>Relative</button>
              <button onClick={() => setSortOrder('asc')}>Low to High</button>
              <button onClick={() => setSortOrder('desc')}>High to Low</button>
            </div>
          </div>
        </div>
      </div>
      <div className='shopPage'>
        <ShopSideNav />
        <div className='shopMain'>
          <div className="shop-cards">
            {currentProducts.map((item, index) => (
              <HomeCard
                key={index}
                img={item.images[0]}
                name={item.title}
                mrp={item.mrp}
                price={item.price}
                subTitle={item.subTitle}
                ProIDSearch={item.ProIDSearch}
                category={item.category}
              />
            ))}
          </div>
          <div className="pagination">
            <button 
              onClick={() => paginate(currentPage - 1)} 
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
              onClick={() => paginate(currentPage + 1)} 
              disabled={currentPage === totalPages}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Shop;
