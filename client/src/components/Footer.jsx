import React from 'react';
import { NavLink } from 'react-router-dom'; // Make sure you have react-router-dom installed
import '../style/Footer.css';

const navItems = [
  { label: "Chips", linkName: "chips", path: "eat/lng" },
  { label: "Chocolates", linkName: "chocolates", path: "eat/0pt" },
  { label: "Biscuit, Cookie and Rusk", linkName: "biscuit", path: "eat/5am" },
  { label: "Fruit Juice", linkName: "fruitJuice", path: "eat/br4" },
  { label: "Noodle", linkName: "noodle", path: "eat/pqj" },
  { label: "Soft Drink", linkName: "softDrink", path: "eat/iw1" },
  { label: "Fruits", linkName: "fruits", path: "eat/w2q" },
  { label: "Vegetables", linkName: "vegetables", path: "eat/lmt" },
  { label: "Flour", linkName: "flour", path: "eat/e6o" },
  { label: "Milk", linkName: "milk", path: "eat/zn0" },
  { label: "Syrup", linkName: "syrup", path: "eat/vqg" },
  { label: "Tea", linkName: "tea", path: "eat/fpm" },
  { label: "Coffee", linkName: "coffee", path: "eat/dui" },
];

const Footer = () => {
  return (
    <footer className="footer">
      <nav className="footer-nav">
        <ul>
          {navItems.map((item, index) => (
            <li key={index}>
              <NavLink to={`shop?id=${item.linkName}`}>
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </footer>
  );
};

export default Footer;
