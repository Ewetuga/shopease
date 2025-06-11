import React, { useState } from 'react';

// Import images from assets
import dog1 from './assets/dog1.jpg';
import dog2 from './assets/dog2.jpg';
import dog3 from './assets/dog3.jpg';
import dog4 from './assets/dog4.jpg';

// Demo product data using local images
const PRODUCTS = [
  { id: 1, title: 'Wireless Headphones', price: 99.99, image: dog1, category: 'Electronics' },
  { id: 2, title: 'Smart Watch', price: 149.99, image: dog2, category: 'Electronics' },
  { id: 3, title: 'Running Shoes', price: 79.99, image: dog3, category: 'Fashion' },
  { id: 4, title: 'Backpack', price: 39.99, image: dog4, category: 'Fashion' },
  { id: 5, title: 'Coffee Maker', price: 59.99, image: dog1, category: 'Home' },
  { id: 6, title: 'Desk Lamp', price: 24.99, image: dog2, category: 'Home' },
];

const CATEGORIES = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];
const SORTS = [
  { value: 'default', label: 'Default' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'title-asc', label: 'Title: A-Z' },
  { value: 'title-desc', label: 'Title: Z-A' },
];

function App() {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  // Filter and sort products
  let filtered = PRODUCTS.filter(p => category === 'All' || p.category === category);
  if (sort === 'price-asc') filtered = filtered.slice().sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered = filtered.slice().sort((a, b) => b.price - a.price);
  if (sort === 'title-asc') filtered = filtered.slice().sort((a, b) => a.title.localeCompare(b.title));
  if (sort === 'title-desc') filtered = filtered.slice().sort((a, b) => b.title.localeCompare(a.title));

  // Cart handlers
  const addToCart = (product) => {
    setCart((prev) => {
      const found = prev.find(item => item.id === product.id);
      if (found) {
        return prev.map(item => item.id === product.id ? { ...item, qty: item.qty + 1 } : item);
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };
  const removeFromCart = (id) => setCart(cart => cart.filter(item => item.id !== id));
  const changeQty = (id, delta) => setCart(cart => cart.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item));
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Checkout (demo)
  const checkout = () => {
    alert('Thank you for your purchase! (Demo only)');
    setCart([]);
    setShowCart(false);
  };

  return (
    <>
      <header className="header">
        <a href="#" className="logo">ShopEase</a>
        {/* <nav >
          <a href="#products" >Products</a>
          <a href="#about" >About</a>
          <a href="#contact" >Contact</a>
        </nav> */}
        <button className="cart-btn" onClick={() => setShowCart(true)}>
          Cart ({cart.reduce((sum, item) => sum + item.qty, 0)})
        </button>
      </header>

      <main className="main">
        <aside className="sidebar">
          <div className="filter-group">
            <label className="filter-label">Category</label>
            <select className="filter-select" value={category} onChange={e => setCategory(e.target.value)}>
              {CATEGORIES.map(cat => <option key={cat}>{cat}</option>)}
            </select>
          </div>
          <div className="filter-group">
            <label className="filter-label">Sort By</label>
            <select className="sort-select" value={sort} onChange={e => setSort(e.target.value)}>
              {SORTS.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
            </select>
          </div>
        </aside>
        <section className="product-list">
          {filtered.map(product => (
            <div className="product-card" key={product.id}>
              <img className="product-image" src={product.image} alt={product.title} />
              <div className="product-title">{product.title}</div>
              <div className="product-price">${product.price.toFixed(2)}</div>
              <button className="add-to-cart-btn" onClick={() => addToCart(product)}>Add to Cart</button>
            </div>
          ))}
        </section>
      </main>
      {showCart && (
        <div className="cart-modal">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
            <div className="cart-header">Your Cart</div>
            <button
              className="cart-btn"
              style={{ minWidth: 32, minHeight: 32, fontSize: 16, padding: '0 12px' }}
              aria-label="Close cart"
              onClick={() => setShowCart(false)}
            >
              Close Cart
            </button>
          </div>
          <div className="cart-items">
            {cart.length === 0 && <div>Your cart is empty.</div>}
            {cart.map(item => (
              <div className="cart-item" key={item.id}>
                <span className="cart-item-title">{item.title}</span>
                <button onClick={() => changeQty(item.id, -1)}>-</button>
                <span className="cart-item-qty">{item.qty}</span>
                <button onClick={() => changeQty(item.id, 1)}>+</button>
                <span>${(item.price * item.qty).toFixed(2)}</span>
                <button onClick={() => removeFromCart(item.id)} style={{marginLeft:8}}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-total">Total: ${total.toFixed(2)}</div>
          <button className="checkout-btn" onClick={checkout} disabled={cart.length === 0}>Checkout</button>
          <button className="cart-btn" style={{marginTop:12}} onClick={() => setShowCart(false)}>Close</button>
        </div>
        
      )}
      <footer style={{ background: '#fff', marginTop: '3rem', padding: '2rem 0', textAlign: 'center', color: '#888', fontSize: '1rem', borderTop: '1px solid #eee' }}>
        &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
      </footer>
    </>
  );
}

export default App;
