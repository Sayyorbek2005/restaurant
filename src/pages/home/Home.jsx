import { HomeCards, HomePage } from './Home.styles';

// ? imgs
import imgOne from '../../assets/resImgFirst.jpg'
// import img2 from '../../assets/imgs/2.jpg'
// import img3 from '../../assets/imgs/3.jpg'
const Home = () => {
  return (
    
    <div className="max-width">

      <HomePage>

        <HomeCards>
          <img src={imgOne} alt="restaurant" />
          <h1>Stol band qilish</h1>
          <p>descript</p>
        </HomeCards>
        <HomeCards>
          <img src={imgOne} alt="restaurant" />
          <h1>Buyurtma berish</h1>
          <p>descript</p>
        </HomeCards>
        <HomeCards>
          <img src={imgOne} alt="restaurant" />
          <h1>Yetkazib berish</h1>
          <p>descript</p>
        </HomeCards>

     
       
      </HomePage>
    </div>
  )
}

export default Home
