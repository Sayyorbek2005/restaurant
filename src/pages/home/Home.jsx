import { HomeCards, HomeContCards, HomeHeader, HomePage } from './Home.styles';

// ? imgs
import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'


import logo from '../../assets/primary-logo.png'
import { Button } from '../../style/StyleComponent';



// import img3 from '../../assets/imgs/3.jpg'
const Home = () => {

  return (

    
    <HomePage>
        <div className="max-width">

        <HomeHeader>

          <img src={logo} alt="logo" />
          <h1>
           Restaurant
          </h1>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Aliquid, vitae!</p>
        </HomeHeader>

        <HomeContCards>

          <HomeCards>
            <img src={imgOne} alt="restaurant" />
            <h2>Stol band qilish</h2>
            <p>descript</p>
            <Button> kirish </Button>
          </HomeCards>
          <HomeCards>
            <img src={imgTwo} alt="restaurant" />
            <h2>Buyurtma berish</h2>
            <p>descript</p>
            <Button> kirish </Button>
          </HomeCards>
          <HomeCards>
            <img src={imgThree} alt="restaurant" />
            <h2>Yetkazib berish</h2>
            <p>descript</p>
            <Button> kirish </Button>
          </HomeCards>
        </HomeContCards>



    </div>
      </HomePage>
  )
}

export default Home
