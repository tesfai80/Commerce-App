
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Test from '../pages/Test';
const Cart = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item 1', price: 5.00 }
  ]);

  const addToCart = () => {
    const newItem = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      price: 5.00
    };
    setItems([...items, newItem]);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + item.price, 0);
  };

  const checkout = async () => {
    const totalAmount = calculateTotal();
    try {
      const response = await fetch('/api/sendInvoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ total: totalAmount }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
    }
  };

  
  const titleStyle = {
    textAlign: 'center',
    color: '#333',
    fontSize: '24px',
    fontWeight: 'bold',
    margin: '20px 0'
  };

  const cartStyle = {
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '20px',
    margin: '20px auto',
    maxWidth: '600px',
  };

  const itemStyle = {
    borderBottom: '1px solid #eee',
    paddingBottom: '10px',
    marginBottom: '10px',
  };

  const buttonStyle = {
    backgroundColor: '#4CAF50',
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  };

  const totalStyle = {
    textAlign: 'right',
    marginTop: '20px',
    fontSize: '18px',
    fontWeight: 'bold',
  };
  const navButtonStyle = {
    backgroundColor: '#008CBA', // Blue color
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    textDecoration: 'none', // Removes underline from link
  };

  return (
    
    <div style={cartStyle}>
      <div style={titleStyle}>E-Commerce App</div>
      {items.map(item => (
        <div key={item.id} style={itemStyle}>
          {item.name} - ${item.price.toFixed(2)}
        </div>
      ))}
      <div>
        <button style={buttonStyle} onClick={addToCart}>Add to Cart</button>
        <button style={buttonStyle} onClick={checkout}>Checkout</button>
      </div>
      <div style={totalStyle}>
        Total: ${calculateTotal().toFixed(2)}
      </div>
      <Link href="/Test" style={navButtonStyle}>
        Go to Test Page 1
      </Link>
    </div>
  );
};

export default Cart;
