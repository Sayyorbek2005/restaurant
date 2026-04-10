import React, { useState } from 'react'
import { 
  OrderMenu, OrderNav, OrderPage, OrderTitle, 
  CartModal, CartOverlay, CartButtonWrapper, 
  CartItemRow, CartFooter, CardControlWrapper 
} from './Order.style'
import { Button } from '../../style/StyleComponent';

// Toast
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ? imgs
import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/IMG_logo.PNG'
import Footer from '../footer/Footer';

const Order = () => {
  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- MANTIQIY FUNKSIYALAR ---
  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (id) => {
    const existing = cart.find(item => item.id === id);
    if (existing.quantity === 1) {
      setCart(cart.filter(item => item.id !== id));
    } else {
      setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
    }
  };

  const deleteItem = (id) => setCart(cart.filter(item => item.id !== id));

  const handleOrderSubmit = () => {
    if (cart.length === 0) return toast.error("Savatchangiz bo'sh!");
    
    toast.success("Buyurtmangiz qabul qilindi!");
    setCart([]);
    setIsCartOpen(false);
  };

  const totalPrice = cart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // --- DATA ---
  const [orderCards] = useState([
    { 
      id: 1,
      img: imgOne, 
      title: 'Taom nomi', 
      desc: 'Taomning qisqacha tavsifi', 
      price: '20$', 
      category: 'Asosiy taomlar' 
    },
    { 
      id: 2, 
      img: imgTwo, 
      title: 'Salat nomi', 
      desc: 'Salatning qisqacha tavsifi', 
      price: '10$', 
      category: 'Salatlar' 
    },
    { 
      id: 3, 
      img: imgThree, 
      title: 'Ichimlik nomi', 
      desc: 'Ichimlikning qisqacha tavsifi', 
      price: '5$', 
      category: 'Ichimliklar' 
    },
    { 
      id: 4, 
      img: logo, 
      title: 'Shirinlik nomi', 
      desc: 'Shirinlikning qisqacha tavsifi', 
      price: '15$', 
      category: 'Shirinliklar' 
    },
    { 
      id: 5, 
      img: imgOne, 
      title: 'Taom nomi', 
      desc: 'Taomning qisqacha tavsifi', 
      price: '20$', 
      category: 'Asosiy taomlar' 
    },
  ]);

  const navs = ['Hammasi', 'Asosiy taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar'];
  const filteredCards = activeNav === 'Hammasi' ? orderCards : orderCards.filter(c => c.category === activeNav);

  return (
    <OrderPage>
      <ToastContainer position="top-right" autoClose={3000} />
      <CartOverlay isOpen={isCartOpen} onClick={() => setIsCartOpen(false)} />
      
      <CartModal isOpen={isCartOpen}>
        <div className="cart-header">
          <h2>Savatcha ({totalItems})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
               <div className="icon">🛒</div>
               <p>Savatchangiz bo'sh</p>
            </div>
          ) : cart.map(item => (
            <CartItemRow key={item.id}>
              <div className="item-main">
                <div>
                  <h4>{item.title}</h4>
                  <small>{item.price} dan</small>
                </div>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>&times;</button>
              </div>
              <div className="item-controls">
                <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                <span className="qty-num">{item.quantity}</span>
                <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                <div className="price-total">{parseInt(item.price) * item.quantity}$</div>
              </div>
            </CartItemRow>
          ))}
        </div>

        <CartFooter>
          <div className="total-row">
            <span>Jami:</span>
            <span>{totalPrice}$</span>
          </div>
          <Button className="submit-btn" onClick={handleOrderSubmit}>
            Buyurtma berish
          </Button>
        </CartFooter>
      </CartModal>

      <div className='max-width'>
        <OrderTitle>
          <h1>Plaza menu</h1>
          <p>Sifatli va halol taomlarimiz siz uchun.</p>
        </OrderTitle>

        <CartButtonWrapper>
          <OrderNav>
            {navs.map(nav => (
              <div key={nav} onClick={() => setActiveNav(nav)} className={`nav-item ${activeNav === nav ? 'active' : ''}`}>
                {nav}
              </div>
            ))}
          </OrderNav>
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>
            🛒 Savatcha ({totalItems})
          </button>
        </CartButtonWrapper>

        <OrderMenu>
          {filteredCards.map(card => {
            const inCart = cart.find(i => i.id === card.id);
            return (
              <div className="order-card" key={card.id}>
                <img src={card.img} alt={card.title} /> 
                <h2>{card.title}</h2>
                <p>{card.desc}</p>
                <div className="for-price-and-btn">
                  <span>{card.price}</span>
                  {inCart ? (
                    <CardControlWrapper>
                      <Button className="control-btn" onClick={() => removeFromCart(card.id)}>-</Button>
                      <span className="qty-display">{inCart.quantity}</span>
                      <Button className="control-btn" onClick={() => addToCart(card)}>+</Button>
                    </CardControlWrapper>
                  ) : (
                    <Button onClick={() => addToCart(card)}>qo`shish</Button>
                  )}
                </div>
              </div>
            )
          })}
        </OrderMenu>
      </div>
      <Footer />
    </OrderPage>
  )
}

export default Order;