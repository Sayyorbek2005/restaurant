import React, { useState } from 'react';
import { 
   DeliveryHeader, Section, 
  InputWrapper, PaymentSelector, MethodBtn, CartSidebar 
} from './Delivery.style';
import { Button } from '../../style/StyleComponent';

const Checkout = ({ cart, totalSum, goBack }) => {
  const [method, setMethod] = useState('Naqd');

  return (
    <div className="max-width" style={{paddingTop: '80px'}}>
      <button onClick={goBack} style={{background: 'none', border: 'none', cursor: 'pointer', fontWeight: 800, marginBottom: '20px'}}>
        ← Menyuga qaytish
      </button>
      <DeliveryHeader style={{textAlign: 'left'}}>
        <h1>Ma'lumotlarni tasdiqlang.</h1>
      </DeliveryHeader>
      
      <form style={{display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '60px', paddingBottom: '100px'}}>
        <div>
          <Section>
            <h2>01. Kontakt</h2>
            <InputWrapper><input placeholder="Ismingiz" /><input placeholder="Telefon" /></InputWrapper>
          </Section>
          <Section>
            <h2>02. Manzil</h2>
            <InputWrapper cols={1}><input placeholder="Ko'cha va uy" /></InputWrapper>
          </Section>
          <Section>
            <h2>03. To'lov</h2>
            <PaymentSelector>
              {['Naqd', 'Click', 'Payme'].map(m => (
                <MethodBtn key={m} type="button" active={method === m} onClick={() => setMethod(m)}>{m}</MethodBtn>
              ))}
            </PaymentSelector>
          </Section>
        </div>

        <CartSidebar>
          <h3>Buyurtmangiz</h3>
          {cart.map(item => (
            <div className="row" key={item.id}><span>{item.qty} x {item.name}</span><span>{(item.qty * item.price).toLocaleString()}</span></div>
          ))}
          <div className="row total"><span>Jami:</span><span>{totalSum.toLocaleString()} UZS</span></div>
          <Button type="submit">Tasdiqlash</Button>
        </CartSidebar>
      </form>
    </div>
  );
};

export default Checkout;