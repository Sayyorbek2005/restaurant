import { HomeCards, HomeContCards, HomeHeader, HomePage } from './Home.styles';

// ? imgs
import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/primary-logo.png'
// ? style
import { Button } from '../../style/StyleComponent';

import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const Home = () => {
  //  navigate
  const navigation = useNavigate();

  // ? click functions
  const reservedClick = () => {
    navigation('/reserved')
  }

  const orderClick = () => {
    navigation('/order')
  }

  const deliveryClick = () => {
    navigation('/delivery')
  }

  // ? use state for information cards
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
  ])  

  return (
    <HomePage>
      <div className="max-width">
        {/* ? home header */}
        <HomeHeader>
          <img src={logo} alt="logo" />
          <h1>Plaza</h1>
          <p>Barchangizga xizmat ko`rsatishimizdan mamnunmiz..!</p>
        </HomeHeader>

        {/* ? cards */}
        <HomeContCards>
          {homeCards.map((card) => (
            <HomeCards onClick={card.click} key={card.id}>
              <img src={card.img} alt="restaurant" />
              <h2>{card.title}</h2>
              <p>{card.desc}</p>
              <Button>{card.btn}</Button>
            </HomeCards>
          ))}
        </HomeContCards>
      </div>
    </HomePage>
  )
}

export default Home
