import React, { useState } from 'react';
import { 
  DeliveryPage, DeliveryTitle, DeliveryNav, DeliveryMenu, 
  CartModal, CartOverlay, CartButtonWrapper, 
  CartItemRow, CartFooter, CardControlWrapper, 
  CheckoutModal, InputGroup 
} from './Delivery.style';
import { Button } from '../../style/StyleComponent';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import imgOne from '../../assets/res.jpg';
import Footer from '../footer/Footer';

import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/IMG_logo.PNG'

const Delivery = () => {
  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Form states
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+998');
  const [userAddress, setUserAddress] = useState('');

  // --- MANTIQ ---
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
    if (existing.quantity === 1) setCart(cart.filter(item => item.id !== id));
    else setCart(cart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item));
  };

  const deleteItem = (id) => setCart(cart.filter(item => item.id !== id));
  const totalPrice = cart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Telefon raqamni boshqarish
  const handlePhoneChange = (e) => {
    const val = e.target.value;
    // Faqat + va raqamlarni qabul qiladi, +998 ni o'chirishga yo'l qo'ymaydi
    if (val.startsWith('+998') && /^[0-9+]*$/.test(val)) {
      setUserPhone(val.slice(0, 13)); // Maksimal 13 belgi (+998901234567)
    }
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();

    // Validatsiya mantiqi
    if (userName.trim().split(' ').length < 2) {
      return toast.error("Iltimos, ism va familiyangizni to'liq kiriting!");
    }
    if (userPhone.length < 13) {
      return toast.error("Telefon raqami to'liq emas!");
    }
    if (userAddress.trim().length < 5) {
      return toast.error("Iltimos, manzilni aniqroq ko'rsating!");
    }

    toast.success("Buyurtmangiz muvaffaqiyatli qabul qilindi!");
    setCart([]);
    setUserName('');
    setUserPhone('+998');
    setUserAddress('');
    setIsCheckoutOpen(false);
  };

  // --- DATA ---
  const [deliveryCards] = useState([
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

  return (
    <DeliveryPage>
      <ToastContainer position="top-right" autoClose={3000} />
      <CartOverlay isOpen={isCartOpen || isCheckoutOpen} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(false); }} />

      {/* 1. CHECKOUT MODAL */}
      <CheckoutModal isOpen={isCheckoutOpen}>
        <h2>Buyurtmani rasmiylashtirish</h2>
        <form onSubmit={handleOrderSubmit}>
          <InputGroup>
            <label>To'liq Ism va Familiyangiz</label>
            <input 
              type="text" 
              placeholder="Ism va familiyangizni kiriting"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label>Telefon raqam</label>
            <input 
              type="tel" 
              value={userPhone}
              onChange={handlePhoneChange}
            />
          </InputGroup>
          <InputGroup>
            <label>Manzil</label>
            <input 
              type="text" 
              placeholder="Ko'cha, uy raqami, xonadon..." 
              value={userAddress}
              onChange={(e) => setUserAddress(e.target.value)}
            />
          </InputGroup>
          <div className="checkout-btns">
            <button type="button" className="cancel" onClick={() => setIsCheckoutOpen(false)}>Orqaga</button>
            <button type="submit" className="confirm">Tasdiqlash</button>
          </div>
        </form>
      </CheckoutModal>

      {/* 2. SAVATCHA (CART) */}
      <CartModal isOpen={isCartOpen}>
        <div className="cart-header">
            <h2>Savat ({totalItems})</h2>
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? <p style={{textAlign: 'center', marginTop: '50px'}}>Savatchangiz hozircha bo'sh</p> : cart.map(item => (
            <CartItemRow key={item.id}>
              <div className="item-main">
                <h4>{item.title}</h4>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>&times;</button>
              </div>
              <div className="item-controls">
                <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                <div className="price-total">{parseInt(item.price) * item.quantity} UZS</div>
              </div>
            </CartItemRow>
          ))}
        </div>
        <CartFooter>
          <div className="total-row"><span>Jami:</span><span>{totalPrice} UZS</span></div>
          <Button className="submit-btn" disabled={cart.length === 0} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>
            Keyingi qadam
          </Button>
        </CartFooter>
      </CartModal>

      {/* 3. ASOSIY SAHIFA */}
      <div className='max-width'>
        <DeliveryTitle>
            <h1>Yetkazib berish</h1>
            <p>Sevimli taomlaringizni uyingizga yetkazamiz</p>
        </DeliveryTitle>

        <CartButtonWrapper>
          <DeliveryNav>
            {['Hammasi', 'Asosiy taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar'].map(n => (
              <div key={n} onClick={() => setActiveNav(n)} className={`nav-item ${activeNav === n ? 'active' : ''}`}>{n}</div>
            ))}
          </DeliveryNav>
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>🛒 Savat ({totalItems})</button>
        </CartButtonWrapper>

        <DeliveryMenu>
          {deliveryCards.filter(c => activeNav === 'Hammasi' || c.category === activeNav).map(card => {
            const inCart = cart.find(i => i.id === card.id);
            return (
              <div className="order-card" key={card.id}>
                <img src={card.img} alt="" />
                <h2>{card.title}</h2>
                <p>{card.desc}</p>
                <div className="for-price-and-btn">
                  <span>{card.price} UZS</span>
                  {inCart ? (
                    <CardControlWrapper>
                      <Button onClick={() => removeFromCart(card.id)}>-</Button>
                      <span className="qty-display">{inCart.quantity}</span>
                      <Button onClick={() => addToCart(card)}>+</Button>
                    </CardControlWrapper>
                  ) : <Button onClick={() => addToCart(card)}>Qo'shish</Button>}
                </div>
              </div>
            );
          })}
        </DeliveryMenu>
      </div>
      <Footer />
    </DeliveryPage>
  );
};

export default Delivery;