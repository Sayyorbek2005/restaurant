import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { 
  OrderMenu, OrderNav, OrderPage, OrderTitle, 
  CartModal, CartOverlay, CartButtonWrapper, 
  CartItemRow, CartFooter, CardControlWrapper,
  HeaderWrapper, BackButton,
  CheckoutModal, InputGroup, ModalButtons 
} from './Order.style';
import { Button } from '../../style/StyleComponent';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/IMG_logo.PNG'
import Footer from '../footer/Footer';

const Order = () => {
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Form states
  const [userName, setUserName] = useState('');
  const [tableNum, setTableNum] = useState('');

  // --- TELEGRAM LOGIC ---
  const sendToTelegram = async () => {
    const token = "8708223354:AAHDfvoi7knAt-ruCQDrKlyvpYOMSjlB6OE";
    const chatId = "8162236227";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const productList = cart.map((item, index) => 
      `${index + 1}. *${item.title}* \n   ${item.quantity} ta x ${item.price} = ${parseInt(item.price) * item.quantity}$`
    ).join('\n\n');

    const message = `
🍽 *YANGI BUYURTMA (MENU)*
━━━━━━━━━━━━━━━━━━
👤 *Mijoz:* ${userName}
🔢 *Stol:* ${tableNum}-stol
━━━━━━━━━━━━━━━━━━
🛒 *MAHSULOTLAR:*
${productList}

💰 *JAMI:* ${totalPrice}$
━━━━━━━━━━━━━━━━━━
    `;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: message,
          parse_mode: "Markdown",
        }),
      });
      return true;
    } catch (e) {
      return false;
    }
  };

  // --- HANDLERS ---
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

  const handleOpenCheckout = () => {
    if (cart.length === 0) return toast.error("Savatchangiz bo'sh!");
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    // TO'LIQ XAVFSIZLIK VA VALIDATSIYA
    if (!userName.trim() || userName.trim().split(' ').length < 2) {
      return toast.error("Iltimos, ism va familiyangizni to'liq kiriting!");
    }
    if (!tableNum || tableNum <= 0) {
      return toast.error("Stol raqamini to'g'ri kiriting!");
    }

    const success = await sendToTelegram();

    if (success) {
      toast.success("Buyurtmangiz qabul qilindi!");
      setCart([]);
      setUserName('');
      setTableNum('');
      setIsCheckoutOpen(false);
    } else {
      toast.error("Xatolik! Internetni tekshiring.");
    }
  };

  const totalPrice = cart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 
  

  const [orderCards] = useState([
    { id: 1, img: imgOne, title: 'Taom nomi', desc: 'Taomning qisqacha tavsifi', price: '10000 so\'m', category: 'Asosiy taomlar' },
    { id: 2, img: imgTwo, title: 'Salat nomi', desc: 'Salatning qisqacha tavsifi', price: '23000 so\'m', category: 'Salatlar' },
    { id: 3, img: imgThree, title: 'Ichimlik nomi', desc: 'Ichimlikning qisqacha tavsifi', price: '5000 so\'m', category: 'Ichimliklar' },
    { id: 4, img: logo, title: 'Shirinlik nomi', desc: 'Shirinlikning qisqacha tavsifi', price: '15000 so\'m', category: 'Shirinliklar' },
    { id: 5, img: imgOne, title: 'Taom nomi', desc: 'Taomning qisqacha tavsifi', price: '20000 so\'m', category: 'Asosiy taomlar' },
  ]);

  const navs = ['Hammasi', 'Asosiy taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar'];
  const filteredCards = activeNav === 'Hammasi' ? orderCards : orderCards.filter(c => c.category === activeNav);

  return (
    <OrderPage>
      <ToastContainer position="top-right" autoClose={3000} />
      <CartOverlay isOpen={isCartOpen || isCheckoutOpen} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(false); }} />
      
      {/* 1. SAVATCHA MODALI */}
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
                <div className="price-total">{parseInt(item.price) * item.quantity} so\'m</div>
              </div>
            </CartItemRow>
          ))}
        </div>
        <CartFooter>
          <div className="total-row"><span>Jami:</span><span>{totalPrice} so\'m</span></div>
          <Button className="submit-btn" onClick={handleOpenCheckout}>Buyurtma berish</Button>
        </CartFooter>
      </CartModal>

      {/* 2. CHECKOUT MODAL (ism va stol) */}
      <CheckoutModal isOpen={isCheckoutOpen}>
        <h2>Tasdiqlash</h2>
        <form onSubmit={handleFinalSubmit}>
          <InputGroup>
            <label>To'liq ism va familiyangiz</label>
            <input 
              type="text" 
              placeholder="Ism va familiyangizni kiriting"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label>Stol raqami</label>
            <input 
              type="number" 
              placeholder="Stol raqamini kiriting"
              value={tableNum}
              onChange={(e) => setTableNum(e.target.value)}
            />
          </InputGroup>
          <ModalButtons>
            <button type="button" className="cancel" onClick={() => setIsCheckoutOpen(false)}>Orqaga</button>
            <button type="submit" className="confirm">Yuborish</button>
          </ModalButtons>
        </form>
      </CheckoutModal>

      <div className='max-width'>
        <HeaderWrapper>
          <BackButton onClick={() => navigate(-1)}>← Orqaga</BackButton>
          <OrderTitle>
            <h1>Plaza menu</h1>
            <p>Sifatli va halol taomlarimiz siz uchun.</p>
          </OrderTitle>
        </HeaderWrapper>

        <CartButtonWrapper>
          <OrderNav>
            {navs.map(nav => (
              <div key={nav} onClick={() => setActiveNav(nav)} className={`nav-item ${activeNav === nav ? 'active' : ''}`}>{nav}</div>
            ))}
          </OrderNav>
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>🛒 Savatcha ({totalItems})</button>
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
                    <CardControlWrapper style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Button className="control-btn" onClick={() => removeFromCart(card.id)}>-</Button>
                      <span className="qty-display" style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{inCart.quantity}</span>
                      <Button className="control-btn" onClick={() => addToCart(card)}>+</Button>
                    </CardControlWrapper>
                  ) : <Button onClick={() => addToCart(card)}>qo`shish</Button>}
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