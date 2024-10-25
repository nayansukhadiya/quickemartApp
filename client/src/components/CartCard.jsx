import React from 'react';
import AddCartBtn from '../components/AddCartBtn';  // Import AddCartBtn for each cart item

function CartCard({ item }) {
  return (
    <div className="CartCard">
      <div className="part-1">
        <div className="imgCartSec lightGrayBorder">
          <img src={item.img} alt={item.name} />
        </div>
        <div className="cartProDetail">
          <div className="cartProName">{item.name}</div>
          <div className="cartProSubTitle">{item.unit}</div>
        </div>
      </div>
      <div className="AmountDetail">
        <AddCartBtn
          ProIDSearch={item.ProIDSearch}
          img={item.img}
          name={item.name}
          price={item.price}
          mrp={item.mrp}
          unit={item.unit}
          category={item.category}
        />
        <p className="cartProTotalAmount">&#8377; {item.ProTotalAmount}</p>
      </div>
    </div>
  );
}

export default CartCard;
