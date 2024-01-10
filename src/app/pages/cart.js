
'use client'
import React, { useState } from 'react';
import Link from 'next/link';
import Test from '../pages/Test';
import store from '../../../store/store';
import { observer } from 'mobx-react-lite';
import sendInvoice from '../pages/api/sendInvoice';
import { toast } from 'react-toastify';
import '../styles.css';
const Cart = observer(() => {
  // const [items, setItems] = useState([{ id: 1, name: 'Item 1', price: 5.00 }]);
  const [items, setItems] = useState([]);
  const addToCart = () => {
    const newItem = {
      id: items.length + 1,
      name: `Item ${items.length + 1}`,
      price: 5.00
    };
    //setItems([...items, newItem]);
    store.addItem(newItem);
  };
  const removeFromCart = () => {
    store.removeItem();
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

  
    const sendInvoice = async () => {
      const totalAmount = store.total.toFixed(2);
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
        alert(`Invoice sent: ${data.message}`);
      } catch (error) {
        console.error('Error sending invoice:', error);
      }
    };

    const notify=()=>{
     // toast(store.total.toFixed(2));
      toast.success(store.total.toFixed(2), {
        position: toast.POSITION.TOP_CENTER
      });
    }
  
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
  const removeButtonStyle= {
    backgroundColor: 'red', 
    color: 'white',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  }
  const sendButtonStyle={
    backgroundColor: '#555', // Example color, adjust as needed
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '10px',
  }
  const notifyButtonStyle={
    backgroundColor: '#000000', // Example color, adjust as needed
      color: 'white',
      padding: '10px 20px',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      marginRight: '10px',
  }

  return (
    
    <div style={cartStyle}>
      <div style={titleStyle}>E-Commerce App</div>
      {store.items.map(item => (
        <div key={item.id} style={itemStyle}>
          {item.name} - ${item.price.toFixed(2)}
        </div>
      ))}
      <div>
        <button style={buttonStyle} onClick={addToCart}>Add to Cart</button>
        <button style={removeButtonStyle} onClick={removeFromCart}>Remove Item</button>
        <button style={sendButtonStyle} onClick={sendInvoice}>Send Invoice</button>
        <button style={buttonStyle} onClick={checkout}>Checkout</button>
        <button style={notifyButtonStyle} onClick={notify}>Notify</button>
      </div>
      <div style={totalStyle}>
      Total (incl. VAT): ${store.total.toFixed(2)}
      </div>
      <Link href="/about" style={navButtonStyle}>
        Go to Test About Page 
      </Link>
     
    </div>
  );
});

export default Cart;
