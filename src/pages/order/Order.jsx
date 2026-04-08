import React, { useState } from 'react'
import { OrderMenu, OrderNav, OrderPage, OrderTitle } from './Order.style'
import { Button } from '../../style/StyleComponent';

// ? imgs
import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/IMG_logo.PNG'
import Footer from '../footer/Footer';

const Order = () => {
  const [activeNav, setActiveNav] = useState('Hammasi');

  const handleNavClick = (nav) => {
    setActiveNav(nav);
  };

  // ? use state for menu cards
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
    {
      id: 6,
      img: imgTwo,
      title: 'Salat nomi',
      desc: 'Salatning qisqacha tavsifi',
      price: '12$',
      category: 'Salatlar'
    },
  ]);

  // ? filter logic
  const filteredCards = activeNav === 'Hammasi' 
    ? orderCards 
    : orderCards.filter(card => card.category === activeNav);

  return (
    <OrderPage>
      <div className='max-width'>
        {/* ? title */}
        <OrderTitle>
          <h1>Plaza menu</h1>
          <p>Sifatli va halol taomlarimiz siz uchun.</p>
        </OrderTitle>

        {/* ? navigation bar */}
        <OrderNav>
          <div onClick={() => handleNavClick('Hammasi')} className={`nav-item ${activeNav === 'Hammasi' ? 'active' : ''}`}>Hammasi</div>
          <div onClick={() => handleNavClick('Asosiy taomlar')} className={`nav-item ${activeNav === 'Asosiy taomlar' ? 'active' : ''}`}>Asosiy taomlar</div>
          <div onClick={() => handleNavClick('Salatlar')} className={`nav-item ${activeNav === 'Salatlar' ? 'active' : ''}`}>Salatlar</div>
          <div onClick={() => handleNavClick('Ichimliklar')} className={`nav-item ${activeNav === 'Ichimliklar' ? 'active' : ''}`}>Ichimliklar</div>
          <div onClick={() => handleNavClick('Shirinliklar')} className={`nav-item ${activeNav === 'Shirinliklar' ? 'active' : ''}`}>Shirinliklar</div>
        </OrderNav>

        {/* ? menu cards */}
        <OrderMenu>
          {filteredCards.map(card => (
            <div className="order-card" key={card.id}>
              <img src={card.img} alt={card.title} /> 
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
              <div className="for-price-and-btn">
                <span>{card.price}</span>
                <Button>qo`shish</Button>
              </div>
            </div>
          ))}
        </OrderMenu>
      </div>
      <Footer />
    </OrderPage>
  )
}

export default Order
