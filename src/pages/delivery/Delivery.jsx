import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  DeliveryPage, DeliveryTitle, DeliveryNav, DeliveryMenu, 
  CartModal, CartOverlay, CartButtonWrapper, 
  CartItemRow, CartFooter, CardControlWrapper, 
  CheckoutModal, InputGroup,
  HeaderWrapper, BackButton 
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
  const navigate = useNavigate();
  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Form states
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+998');
  const [userPhone2, setUserPhone2] = useState('+998');
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

  const handlePhoneChange = (e) => {
    const val = e.target.value;
    if (val.startsWith('+998') && /^[0-9+]*$/.test(val)) {
      setUserPhone(val.slice(0, 13)); 
    }
  };
  const handlePhone2Change = (e) => {
    const val = e.target.value;
    if (val.startsWith('+998') && /^[0-9+]*$/.test(val)) {
      setUserPhone2(val.slice(0, 13));
    }
  };

  // Telegramga xabar yuborish funksiyasi
  const sendOrderToTelegram = async () => {
    const token = "8708223354:AAHDfvoi7knAt-ruCQDrKlyvpYOMSjlB6OE";
    const chatId = "8162236227";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    // Savatdagi mahsulotlarni matn ko'rinishiga keltiramiz
    const productList = cart.map((item, index) => 
      `${index + 1}. *${item.title}* \n   ${item.quantity} ta x ${item.price} = ${parseInt(item.price) * item.quantity} UZS`
    ).join('\n\n');

    const message = `
🛍 *YANGI BUYURTMA (YETKAZIB BERISH)*
━━━━━━━━━━━━━━━━━━
👤 *Mijoz:* ${userName}
📞 *Tel:* ${userPhone}
📞 *Qo'shimcha Tel:* ${userPhone2}
🏠 *Manzil:* ${userAddress}
━━━━━━━━━━━━━━━━━━
🛒 *MAHSULOTLAR:*
${productList}

💰 *JAMI SUMMA:* ${totalPrice} UZS
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
    } catch (error) {
      console.error("Telegram error:", error);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim().split(' ').length < 2) {
      return toast.error("Iltimos, ism va familiyangizni to'liq kiriting!");
    }
    if (userPhone.length < 13) {
      return toast.error("Telefon raqami to'liq emas!");
    }
    if (userPhone2.length < 13) {
      return toast.error("Qo'shimcha telefon raqami to'liq emas!");
    }
    if (userAddress.trim().length < 5) {
      return toast.error("Iltimos, manzilni aniqroq ko'rsating!");
    }

    // Telegramga yuborish
    await sendOrderToTelegram();

    toast.success("Buyurtmangiz muvaffaqiyatli qabul qilindi!");
    
    // Tozalash
    setCart([]);
    setUserName('');
    setUserPhone('+998');
    setUserPhone2('+998');
    setUserAddress('');
    setIsCheckoutOpen(false);
  };

  const [deliveryCards] = useState([
     { id: 1, img: imgOne, title: 'Taom nomi', desc: 'Taomning qisqacha tavsifi', price: '20000', category: 'Asosiy taomlar' },
     { id: 2, img: imgTwo, title: 'Salat nomi', desc: 'Salatning qisqacha tavsifi', price: '10000', category: 'Salatlar' },
     { id: 3, img: imgThree, title: 'Ichimlik nomi', desc: 'Ichimlikning qisqacha tavsifi', price: '5000', category: 'Ichimliklar' },
     { id: 4, img: logo, title: 'Shirinlik nomi', desc: 'Shirinlikning qisqacha tavsifi', price: '15000', category: 'Shirinliklar' },
     { id: 5, img: imgOne, title: 'Taom nomi', desc: 'Taomning qisqacha tavsifi', price: '20000', category: 'Asosiy taomlar' },
  ]);

  return (
    <DeliveryPage>
      <ToastContainer position="top-right" autoClose={3000} />
      <CartOverlay isOpen={isCartOpen || isCheckoutOpen} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(false); }} />

      <CheckoutModal isOpen={isCheckoutOpen}>
        <h2>Buyurtmani rasmiylashtirish</h2>
        <form onSubmit={handleOrderSubmit}>
          <InputGroup>
            <label>To'liq Ism va Familiyangiz</label>
            <input type="text" placeholder="Ism va familiyangizni kiriting" value={userName} onChange={(e) => setUserName(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <label>Telefon raqam</label>
            <input type="tel" value={userPhone} onChange={handlePhoneChange} />
          </InputGroup>
           <InputGroup>
            <label>Qo'shimcha telefon raqam</label>
            <input type="tel2" value={userPhone2} onChange={handlePhone2Change} />
          </InputGroup>
          <InputGroup>
            <label>Manzil</label>
            <input type="text" placeholder="Ko'cha, uy raqami, xonadon..." value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
          </InputGroup>
          <div className="checkout-btns">
            <button type="button" className="cancel" onClick={() => setIsCheckoutOpen(false)}>Orqaga</button>
            <button type="submit" className="confirm">Tasdiqlash</button>
          </div>
        </form>
      </CheckoutModal>

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

      <div className='max-width'>
        <HeaderWrapper>
          <BackButton onClick={() => navigate(-1)}>
            ← Orqaga
          </BackButton>
          <DeliveryTitle>
              <h1>Yetkazib berish</h1>
              <p>Sevimli taomlaringizni uyingizga yetkazamiz</p>
          </DeliveryTitle>
        </HeaderWrapper>

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