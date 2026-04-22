import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  const location = useLocation();
  const lang = localStorage.getItem('lang') || 'uz';

  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const [userName, setUserName] = useState('');
  const [tableNum, setTableNum] = useState('');

  // --- TILGA QARAB MATNLAR ---
  const t = useMemo(() => {
    const content = {
      uz: {
        back: "Orqaga",
        title: "Plaza menu",
        subTitle: "Sifatli va halol taomlarimiz siz uchun.",
        cartBtn: "Savatcha",
        emptyCart: "Savatchangiz bo'sh",
        checkout: "Buyurtma berish",
        total: "Jami",
        confirmTitle: "Tasdiqlash",
        nameLabel: "To'liq ism va familiyangiz",
        namePlaceholder: "Ism va familiyangizni kiriting",
        tableLabel: "Stol raqami",
        qrNotice: "(QR orqali aniqlandi)",
        cancel: "Orqaga",
        confirm: "Yuborish",
        add: "qo`shish",
        navs: ['Hammasi', 'Asosiy taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar'],
        errName: "Iltimos, ism va familiyangizni to'liq kiriting!",
        errTable: "Stol raqamini to'g'ri kiriting!",
        errEmpty: "Savatchangiz bo'sh!",
        errNet: "Xatolik! Internetni tekshiring.",
        success: "Buyurtmangiz qabul qilindi!",
        som: "so'm"
      },
      ru: {
        back: "Назад",
        title: "Меню Plaza",
        subTitle: "Наши качественные и халяльные блюда для вас.",
        cartBtn: "Корзина",
        emptyCart: "Ваша корзина пуста",
        checkout: "Оформить заказ",
        total: "Итого",
        confirmTitle: "Подтверждение",
        nameLabel: "Полное имя и фамилия",
        namePlaceholder: "Введите ваше имя и фамилию",
        tableLabel: "Номер стола",
        qrNotice: "(Определено по QR)",
        cancel: "Назад",
        confirm: "Отправить",
        add: "добавить",
        navs: ['Все', 'Основные блюда', 'Салаты', 'Напитки', 'Десерты'],
        errName: "Пожалуйста, введите полное имя и фамилию!",
        errTable: "Введите правильный номер стола!",
        errEmpty: "Ваша корзина пуста!",
        errNet: "Ошибка! Проверьте интернет.",
        success: "Ваш заказ принят!",
        som: "сум"
      }
    };
    return content[lang] || content.uz;
  }, [lang]);

  // --- TAOMLAR (TILGA QARAB) ---
  const orderCards = useMemo(() => [
    { id: 1, img: imgOne, title: lang === 'uz' ? 'Asosiy taom' : 'Основное блюдо', desc: lang === 'uz' ? 'Taomning qisqacha tavsifi' : 'Краткое описание блюда', price: '10000', category: lang === 'uz' ? 'Asosiy taomlar' : 'Основные блюда' },
    { id: 2, img: imgTwo, title: lang === 'uz' ? 'Salat nomi' : 'Название салата', desc: lang === 'uz' ? 'Salatning qisqacha tavsifi' : 'Краткое описание салата', price: '23000', category: lang === 'uz' ? 'Salatlar' : 'Салаты' },
    { id: 3, img: imgThree, title: lang === 'uz' ? 'Ichimlik nomi' : 'Напиток', desc: lang === 'uz' ? 'Ichimlikning qisqacha tavsifi' : 'Краткое описание напитка', price: '5000', category: lang === 'uz' ? 'Ichimliklar' : 'Напитки' },
    { id: 4, img: logo, title: lang === 'uz' ? 'Shirinlik nomi' : 'Десерт', desc: lang === 'uz' ? 'Shirinlikning qisqacha tavsifi' : 'Краткое описание десерта', price: '15000', category: lang === 'uz' ? 'Shirinliklar' : 'Десерты' },
    { id: 5, img: imgOne, title: lang === 'uz' ? 'Taom nomi' : 'Блюдо', desc: lang === 'uz' ? 'Taomning qisqacha tavsifi' : 'Краткое описание блюда', price: '20000', category: lang === 'uz' ? 'Asosiy taomlar' : 'Основные блюда' },
  ], [lang]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const table = params.get('table');
    if (table) {
      setTableNum(table);
    }
    setActiveNav(t.navs[0]); // Til o'zgarganda birinchi navigatsiyaga qaytish
  }, [location, t]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === product.id);
      if (existing) {
        return prevCart.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart(prevCart => {
      const existing = prevCart.find(item => item.id === id);
      if (existing.quantity === 1) return prevCart.filter(item => item.id !== id);
      return prevCart.map(item => item.id === id ? { ...item, quantity: item.quantity - 1 } : item);
    });
  };

  const deleteItem = (id) => setCart(prev => prev.filter(item => item.id !== id));

  const handleOpenCheckout = () => {
    if (cart.length === 0) return toast.error(t.errEmpty);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const totalPrice = cart.reduce((acc, item) => acc + (parseInt(item.price) * item.quantity), 0);
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0); 

  const handleFinalSubmit = async (e) => {
    e.preventDefault();

    if (!userName.trim() || userName.trim().split(' ').length < 2) {
      return toast.error(t.errName);
    }
    if (!tableNum || tableNum <= 0) {
      return toast.error(t.errTable);
    }

    const token = "8708223354:AAHDfvoi7knAt-ruCQDrKlyvpYOMSjlB6OE";
    const chatId = "8162236227";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const productList = cart.map((item, index) => 
      `${index + 1}. *${item.title}* \n   ${item.quantity} ta x ${item.price} = ${parseInt(item.price) * item.quantity} ${t.som}`
    ).join('\n\n');

    const message = `
🍽 *YANGI BUYURTMA (MENU)*
━━━━━━━━━━━━━━━━━━
👤 *Mijoz:* ${userName}
🔢 *Stol:* ${tableNum}-stol
━━━━━━━━━━━━━━━━━━
🛒 *MAHSULOTLAR:*
${productList}

💰 *JAMI:* ${totalPrice} ${t.som}
━━━━━━━━━━━━━━━━━━`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });
      toast.success(t.success);
      setCart([]);
      setUserName('');
      if (!new URLSearchParams(location.search).get('table')) setTableNum('');
      setIsCheckoutOpen(false);
    } catch (e) {
      toast.error(t.errNet);
    }
  };

  const filteredCards = activeNav === t.navs[0] ? orderCards : orderCards.filter(c => c.category === activeNav);

  return (
    <OrderPage>
      <ToastContainer position="top-right" autoClose={3000} />
      <CartOverlay isOpen={isCartOpen || isCheckoutOpen} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(false); }} />
      
      {/* --- SAVATCHA MODAL --- */}
      <CartModal isOpen={isCartOpen}>
        <div className="cart-header">
          <h2>{t.cartBtn} ({totalItems})</h2>
          <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? (
            <div className="empty-cart">
               <div className="icon">🛒</div>
               <p>{t.emptyCart}</p>
            </div>
          ) : cart.map(item => (
            <CartItemRow key={item.id}>
              <div className="item-main">
                <div>
                  <h4>{item.title}</h4>
                  <small>{item.price} {t.som}</small>
                </div>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>&times;</button>
              </div>
              <div className="item-controls">
                <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                <span className="qty-num">{item.quantity}</span>
                <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                <div className="price-total">{parseInt(item.price) * item.quantity} {t.som}</div>
              </div>
            </CartItemRow>
          ))}
        </div>
        <CartFooter>
          <div className="total-row"><span>{t.total}:</span><span>{totalPrice} {t.som}</span></div>
          <Button className="submit-btn" onClick={handleOpenCheckout}>{t.checkout}</Button>
        </CartFooter>
      </CartModal>

      {/* --- TASDIQLASH MODAL --- */}
      <CheckoutModal isOpen={isCheckoutOpen}>
        <h2>{t.confirmTitle}</h2>
        <form onSubmit={handleFinalSubmit}>
          <InputGroup>
            <label>{t.nameLabel}</label>
            <input 
              type="text" 
              placeholder={t.namePlaceholder}
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </InputGroup>
          <InputGroup>
            <label>{t.tableLabel} {new URLSearchParams(location.search).get('table') && t.qrNotice}</label>
            <input 
              type="number" 
              value={tableNum}
              onChange={(e) => setTableNum(e.target.value)}
              readOnly={!!new URLSearchParams(location.search).get('table')}
              style={new URLSearchParams(location.search).get('table') ? {background: '#f0f0f0', cursor: 'not-allowed'} : {}}
            />
          </InputGroup>
          <ModalButtons>
            <button type="button" className="cancel" onClick={() => setIsCheckoutOpen(false)}>{t.cancel}</button>
            <button type="submit" className="confirm">{t.confirm}</button>
          </ModalButtons>
        </form>
      </CheckoutModal>

      <div className='max-width'>
        <HeaderWrapper>
          <BackButton onClick={() => navigate(-1)}>← {t.back}</BackButton>
          <OrderTitle>
            <h1>{t.title}</h1>
            <p>{t.subTitle}</p>
          </OrderTitle>
        </HeaderWrapper>

        <CartButtonWrapper>
          <OrderNav>
            {t.navs.map(nav => (
              <div key={nav} onClick={() => setActiveNav(nav)} className={`nav-item ${activeNav === nav ? 'active' : ''}`}>{nav}</div>
            ))}
          </OrderNav>
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>🛒 {t.cartBtn} ({totalItems})</button>
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
                  <span>{card.price} {t.som}</span>
                  {inCart ? (
                    <CardControlWrapper style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <Button className="control-btn" onClick={() => removeFromCart(card.id)}>-</Button>
                      <span className="qty-display" style={{ minWidth: '20px', textAlign: 'center', fontWeight: 'bold' }}>{inCart.quantity}</span>
                      <Button className="control-btn" onClick={() => addToCart(card)}>+</Button>
                    </CardControlWrapper>
                  ) : <Button onClick={() => addToCart(card)}>{t.add}</Button>}
                </div>
              </div>
            )
          })}
        </OrderMenu>
      </div>
      <Footer />
    </OrderPage>
  );
};

export default Order;