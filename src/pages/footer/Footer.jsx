import React from 'react'
import { FooterCont, FooterPage } from './footer.style'

// ? imgs
import logo from '../../assets/IMG_logo.PNG'

const Footer = () => {
  return (
    <FooterPage>
    <div className='max-width'>
      
      <FooterCont>
        <img src={logo} alt="logo" />

    <div>
      <h1>Buyurtmangizni hoziroq bering!</h1>
        <p>Tez va sifatli xizmat, eng yangi taomlar</p>
        {/* <span>© 2024 Plaza. Barcha huquqlar himoyalangan.</span> */}
    </div>
      </FooterCont> 

    </div>
        </FooterPage>
  )
}

export default Footer
