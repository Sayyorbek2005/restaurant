import React, { useState, useMemo } from 'react';
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
  const lang = localStorage.getItem('lang') || 'uz';

  const [activeNav, setActiveNav] = useState('Hammasi');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  // Form states
  const [userName, setUserName] = useState('');
  const [userPhone, setUserPhone] = useState('+998');
  const [userPhone2, setUserPhone2] = useState('+998');
  const [userAddress, setUserAddress] = useState('');

  // --- TILGA QARAB MATNLAR ---
  const t = useMemo(() => {
    const content = {
      uz: {
        back: "Orqaga",
        title: "Yetkazib berish",
        subTitle: "Sevimli taomlaringizni uyingizga yetkazamiz",
        cartBtn: "Savat",
        emptyCart: "Savatchangiz hozircha bo'sh",
        next: "Keyingi qadam",
        total: "Jami",
        confirmTitle: "Buyurtmani rasmiylashtirish",
        nameLabel: "To'liq Ism va Familiyangiz",
        namePlaceholder: "Ism va familiyangizni kiriting",
        phoneLabel: "Telefon raqam",
        phone2Label: "Qo'shimcha telefon raqam",
        addressLabel: "Manzil",
        addressPlaceholder: "Ko'cha, uy raqami, xonadon...",
        cancel: "Orqaga",
        confirm: "Tasdiqlash",
        add: "Qo'shish",
        navs: ['Hammasi', 'Asosiy taomlar', 'Salatlar', 'Ichimliklar', 'Shirinliklar'],
        errName: "Iltimos, ism va familiyangizni to'liq kiriting!",
        errPhone: "Telefon raqami to'liq emas!",
        errAddress: "Iltimos, manzilni aniqroq ko'rsating!",
        success: "Buyurtmangiz muvaffaqiyatli qabul qilindi!",
        som: "UZS"
      },
      ru: {
        back: "Назад",
        title: "Доставка",
        subTitle: "Доставим ваши любимые блюда прямо к вам домой",
        cartBtn: "Корзина",
        emptyCart: "Ваша корзина пока пуста",
        next: "Следующий шаг",
        total: "Итого",
        confirmTitle: "Оформление заказа",
        nameLabel: "Ваше полное имя и фамилия",
        namePlaceholder: "Введите имя и фамилию",
        phoneLabel: "Номер телефона",
        phone2Label: "Дополнительный номер",
        addressLabel: "Адрес",
        addressPlaceholder: "Улица, номер дома, квартира...",
        cancel: "Назад",
        confirm: "Подтвердить",
        add: "Добавить",
        navs: ['Все', 'Основные блюда', 'Салаты', 'Напитки', 'Десерты'],
        errName: "Пожалуйста, введите полное имя и фамилию!",
        errPhone: "Номер телефона введен не полностью!",
        errAddress: "Пожалуйста, укажите адрес точнее!",
        success: "Ваш заказ успешно принят!",
        som: "UZS"
      }
    };
    return content[lang] || content.uz;
  }, [lang]);

  // --- TAOMLAR RO'YXATI (TILGA QARAB) ---
  const deliveryCards = useMemo(() => [
    { id: 1, img: imgOne, title: lang === 'uz' ? 'Taom nomi' : 'Название блюда', desc: lang === 'uz' ? 'Taomning qisqacha tavsifi' : 'Краткое описание блюда', price: '20000', category: lang === 'uz' ? 'Asosiy taomlar' : 'Основные блюда' },
    { id: 2, img: imgTwo, title: lang === 'uz' ? 'Salat nomi' : 'Название салата', desc: lang === 'uz' ? 'Salatning qisqacha tavsifi' : 'Краткое описание салата', price: '10000', category: lang === 'uz' ? 'Salatlar' : 'Салаты' },
    { id: 3, img: imgThree, title: lang === 'uz' ? 'Ichimlik nomi' : 'Напиток', desc: lang === 'uz' ? 'Ichimlikning qisqacha tavsifi' : 'Краткое описание напитка', price: '5000', category: lang === 'uz' ? 'Ichimliklar' : 'Напитки' },
    { id: 4, img: logo, title: lang === 'uz' ? 'Shirinlik nomi' : 'Десерт', desc: lang === 'uz' ? 'Shirinlikning qisqacha tavsifi' : 'Краткое описание десерта', price: '15000', category: lang === 'uz' ? 'Shirinliklar' : 'Десерты' },
    { id: 5, img: imgOne, title: lang === 'uz' ? 'Taom nomi' : 'Блюдо', desc: lang === 'uz' ? 'Taomning qisqacha tavsifi' : 'Краткое описание блюда', price: '20000', category: lang === 'uz' ? 'Asosiy taomlar' : 'Основные блюда' },
  ], [lang]);

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

  const sendOrderToTelegram = async () => {
    const token = "8708223354:AAHDfvoi7knAt-ruCQDrKlyvpYOMSjlB6OE";
    const chatId = "8162236227";
    const url = `https://api.telegram.org/bot${token}/sendMessage`;

    const productList = cart.map((item, index) => 
      `${index + 1}. *${item.title}* \n   ${item.quantity} ta x ${item.price} = ${parseInt(item.price) * item.quantity} ${t.som}`
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

💰 *JAMI SUMMA:* ${totalPrice} ${t.som}
━━━━━━━━━━━━━━━━━━`;

    try {
      await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });
    } catch (error) {
      console.error("Telegram error:", error);
    }
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (userName.trim().split(' ').length < 2) {
      return toast.error(t.errName);
    }
    if (userPhone.length < 13) {
      return toast.error(t.errPhone);
    }
    if (userPhone2.length < 13) {
      return toast.error(t.errPhone);
    }
    if (userAddress.trim().length < 5) {
      return toast.error(t.errAddress);
    }

    await sendOrderToTelegram();
    toast.success(t.success);
    
    setCart([]);
    setUserName('');
    setUserPhone('+998');
    setUserPhone2('+998');
    setUserAddress('');
    setIsCheckoutOpen(false);
  };

  return (
    <DeliveryPage>
      <ToastContainer position="top-right" autoClose={3000} />
      <CartOverlay isOpen={isCartOpen || isCheckoutOpen} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(false); }} />

      {/* --- TASDIQLASH MODAL --- */}
      <CheckoutModal isOpen={isCheckoutOpen}>
        <h2>{t.confirmTitle}</h2>
        <form onSubmit={handleOrderSubmit}>
          <InputGroup>
            <label>{t.nameLabel}</label>
            <input type="text" placeholder={t.namePlaceholder} value={userName} onChange={(e) => setUserName(e.target.value)} />
          </InputGroup>
          <InputGroup>
            <label>{t.phoneLabel}</label>
            <input type="tel" value={userPhone} onChange={handlePhoneChange} />
          </InputGroup>
           <InputGroup>
            <label>{t.phone2Label}</label>
            <input type="tel" value={userPhone2} onChange={handlePhone2Change} />
          </InputGroup>
          <InputGroup>
            <label>{t.addressLabel}</label>
            <input type="text" placeholder={t.addressPlaceholder} value={userAddress} onChange={(e) => setUserAddress(e.target.value)} />
          </InputGroup>
          <div className="checkout-btns">
            <button type="button" className="cancel" onClick={() => setIsCheckoutOpen(false)}>{t.cancel}</button>
            <button type="submit" className="confirm">{t.confirm}</button>
          </div>
        </form>
      </CheckoutModal>

      {/* --- SAVAT MODAL --- */}
      <CartModal isOpen={isCartOpen}>
        <div className="cart-header">
            <h2>{t.cartBtn} ({totalItems})</h2>
            <button className="close-btn" onClick={() => setIsCartOpen(false)}>&times;</button>
        </div>
        <div className="cart-items">
          {cart.length === 0 ? <p style={{textAlign: 'center', marginTop: '50px'}}>{t.emptyCart}</p> : cart.map(item => (
            <CartItemRow key={item.id}>
              <div className="item-main">
                <h4>{item.title}</h4>
                <button className="delete-btn" onClick={() => deleteItem(item.id)}>&times;</button>
              </div>
              <div className="item-controls">
                <button className="qty-btn" onClick={() => removeFromCart(item.id)}>-</button>
                <span>{item.quantity}</span>
                <button className="qty-btn" onClick={() => addToCart(item)}>+</button>
                <div className="price-total">{parseInt(item.price) * item.quantity} {t.som}</div>
              </div>
            </CartItemRow>
          ))}
        </div>
        <CartFooter>
          <div className="total-row"><span>{t.total}:</span><span>{totalPrice} {t.som}</span></div>
          <Button className="submit-btn" disabled={cart.length === 0} onClick={() => { setIsCartOpen(false); setIsCheckoutOpen(true); }}>
            {t.next}
          </Button>
        </CartFooter>
      </CartModal>

      <div className='max-width'>
        <HeaderWrapper>
          <BackButton onClick={() => navigate(-1)}>
            ← {t.back}
          </BackButton>
          <DeliveryTitle>
              <h1>{t.title}</h1>
              <p>{t.subTitle}</p>
          </DeliveryTitle>
        </HeaderWrapper>

        <CartButtonWrapper>
          <DeliveryNav>
            {t.navs.map(n => (
              <div key={n} onClick={() => setActiveNav(n === t.navs[0] ? 'Hammasi' : n)} className={`nav-item ${activeNav === (n === t.navs[0] ? 'Hammasi' : n) ? 'active' : ''}`}>{n}</div>
            ))}
          </DeliveryNav>
          <button className="cart-icon-btn" onClick={() => setIsCartOpen(true)}>🛒 {t.cartBtn} ({totalItems})</button>
        </CartButtonWrapper>

        <DeliveryMenu>
          {deliveryCards.filter(c => activeNav === 'Hammasi' || c.category === (lang === 'uz' ? activeNav : activeNav)).map(card => {
            const inCart = cart.find(i => i.id === card.id);
            return (
              <div className="order-card" key={card.id}>
                <img src={card.img} alt="" />
                <h2>{card.title}</h2>
                <p>{card.desc}</p>
                <div className="for-price-and-btn">
                  <span>{card.price} {t.som}</span>
                  {inCart ? (
                    <CardControlWrapper>
                      <Button onClick={() => removeFromCart(card.id)}>-</Button>
                      <span className="qty-display">{inCart.quantity}</span>
                      <Button onClick={() => addToCart(card)}>+</Button>
                    </CardControlWrapper>
                  ) : <Button onClick={() => addToCart(card)}>{t.add}</Button>}
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