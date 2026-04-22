import { HomeCards, HomeContCards, HomeHeader, HomePage } from './Home.styles';
import imgOne from '../../assets/res.jpg';
import imgTwo from '../../assets/buyurtma.avif';
import imgThree from '../../assets/yetkazish.jpeg';
import logo from '../../assets/IMG_logo.PNG';
import { Button } from '../../style/StyleComponent';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Home = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [tableId, setTableId] = useState(null);

  // QR skaner qilinganda URL parametridan stol raqamini olish
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const table = params.get('table');
    if (table) {
      setTableId(table);
    }
  }, [location]);

  const reservedClick = () => {
    navigation('/reserved');
  };

  const orderClick = () => {
    // Agar stol raqami aniqlangan bo'lsa, uni Order sahifasiga uzatamiz
    if (tableId) {
      navigation(`/order?table=${tableId}`);
    } else {
      navigation('/order');
    }
  };

  const deliveryClick = () => {
    navigation('/delivery');
  };

  const [homeCards] = useState([
    {
      id: 1,  
      img: imgOne,
      title: 'Stol band qilish',
      desc: 'Qulay joyni oldindan band qiling.',
      btn: 'Band qilish',
      click: reservedClick
    },
    {
      id: 2,
      img: imgTwo,
      title: 'Buyurtma berish',
      desc: 'Sevimli taomingizni hoziroq buyurtma bering.',
      btn: 'Buyurtma berish',
      click: orderClick
    },
    {
      id: 3,
      img: imgThree,  
      title: 'Yetkazib berish',
      desc: 'Taomingizni tez va issiq holda yetkazamiz.',
      btn: 'Yetkazib berish',
      click: deliveryClick
    }
  ]);

  return (
    <HomePage>
      <div className="max-width">
        <HomeHeader>
          <img src={logo} alt="logo" />
          <h1>Plaza</h1>
          {tableId && (
            <div style={{
              background: '#e67e22',
              color: '#fff',
              padding: '6px 16px',
              borderRadius: '25px',
              fontSize: '14px',
              fontWeight: 'bold',
              margin: '10px 0',
              display: 'inline-block',
              boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
            }}>
              Stol №{tableId}
            </div>
          )}
          <p>Barchangizga xizmat ko`rsatishimizdan mamnunmiz..!</p>
        </HomeHeader>

        <HomeContCards>
          {homeCards.map((card) => (
            <HomeCards onClick={card.click} key={card.id}>
              <img src={card.img} alt={card.title} />
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
              <Button>{card.btn}</Button>
            </HomeCards>
          ))}
        </HomeContCards>
      </div>
    </HomePage>
  );
};

export default Home;