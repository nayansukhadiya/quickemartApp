import React, { useContext } from "react";
import UserContext from "../context/UserContext";
import '../style/ProCategory.css'
import { Link } from "react-router-dom";
function ProCategory() {
  const { navCat } = useContext(UserContext); 
  return (
    <>
    <div className="headProCategory"><p>Category</p><Link>Sell all Category</Link></div>
    <div className='ProCategorySec'>
      {navCat.slice(0,16).map((item)=> (
        <Link className="CatProBox" to={`/shop?id=${item.linkName}`}>
          <div className="catImgBox"> <img
                    src={require(`../assets/cat/cat_${item.linkName}.png`)}
                    alt={item.label}
                  /></div>
          <div className="catName">{item.label}</div>
        </Link>
      ))}
    </div></>
  )
}

export default ProCategory