import React, { useState } from 'react';
import { 
  ReservedPage, ReservedHeader, CategoryGrid, 
  CategoryCard, MainContainer, InputBlock, 
  Sidebar, SectionTitle, TwoColumn 
} from './Reserved.style';
import { Button } from '../../style/StyleComponent';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../footer/Footer';

// Rasmlar
import imgZal from '../../assets/res.jpg'; 
import imgOpenAir from '../../assets/yetkazish.jpeg';
import imgBanket from '../../assets/buyurtma.avif';

const Reserved = () => {
  const [selectedZone, setSelectedZone] = useState('Umumiy zal');
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '+998',
    date: '',
    time: '',
    guests: '2',
    comment: ''
  });

  const zones = [
    { id: 1, name: 'Umumiy zal', desc: 'Jonli musiqa va bayramona kayfiyat', img: imgZal },
    { id: 2, name: 'Banketniy xonalar', desc: 'Maxsus yopiq VIP hududlar', img: imgBanket },
    { id: 3, name: 'Ochiq havo', desc: 'Yulduzlar ostidagi shinam terassa', img: imgOpenAir },
  ];

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
        if (!value.startsWith('+998')) return;
        if (value.length > 13) return;
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleBooking = (e) => {
    e.preventDefault();
    const { fullName, phone, date, time } = formData;

    // Ism familiya tekshiruvi
    if (!fullName.trim()) {
      return toast.error("Iltimos, ism va familiyangizni kiriting!");
    }
    if (fullName.trim().split(' ').length < 2) {
      return toast.error("Iltimos, ism va familiyangizni to'liq kiriting!");
    }

    // Sana va vaqt tekshiruvi
    if (!date) return toast.error("Iltimos, sanani tanlang!");
    if (!time) return toast.error("Iltimos, vaqtni belgilang!");

    // Telefon tekshiruvi
    if (phone === '+998') return toast.error("Telefon raqamingizni kiriting!");
    if (phone.length !== 13) {
      return toast.error("Telefon raqami noto'g'ri (13 ta belgi bo'lishi shart)!");
    }

    // Muvaffaqiyatli xabar
    toast.success("Joy muvaffaqiyatli band qilindi! Xodimlarimiz 5 daqiqa ichida siz bilan bog'lanishadi.");
    
    // Tozalash
    setFormData({ fullName: '', phone: '+998', date: '', time: '', guests: '2', comment: '' });
  };

  return (
    <ReservedPage>
      <ToastContainer position="top-right" theme="colored" />
      <div className="max-width">
        <ReservedHeader>
          <h1>Plaza stol buyurtma</h1>
          <p>Siz uchun eng ma'qul va shinam joyni tanlang.</p>
        </ReservedHeader>

        <SectionTitle>1. Stolni tanlang</SectionTitle>
        <CategoryGrid>
          {zones.map(zone => (
            <CategoryCard 
              key={zone.id} 
              active={selectedZone === zone.name}
              onClick={() => setSelectedZone(zone.name)}
            >
              <div className="img-box"><img src={zone.img} alt={zone.name} /></div>
              <div className="info">
                <h4>{zone.name}</h4>
                <p>{zone.desc}</p>
              </div>
            </CategoryCard>
          ))}
        </CategoryGrid>

        <SectionTitle>2. Ma'lumotlarni to'ldiring</SectionTitle>
        <form onSubmit={handleBooking} noValidate>
          <MainContainer>
            <div className="form-content">
              <InputBlock>
                <label>To'liq Ism va Familiya</label>
                <input 
                  type="text" 
                  name="fullName" 
                  placeholder="Ism va familiyangizni kiriting" 
                  value={formData.fullName} 
                  onChange={handleInput} 
                />
              </InputBlock>

              <TwoColumn>
                <InputBlock>
                  <label>Sana</label>
                  <input type="date" name="date" value={formData.date} onChange={handleInput} />
                </InputBlock>
                <InputBlock>
                  <label>Vaqt</label>
                  <input type="time" name="time" value={formData.time} onChange={handleInput} />
                </InputBlock>
              </TwoColumn>

              <TwoColumn>
                <InputBlock>
                  <label>Telefon</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInput} />
                </InputBlock>
                <InputBlock>
                  <label>Mehmonlar</label>
                  <select name="guests" value={formData.guests} onChange={handleInput}>
                    {[1, 2, 4, 6, 10, 20].map(n => <option key={n} value={n}>{n} kishi</option>)}
                  </select>
                </InputBlock>
              </TwoColumn>

              <InputBlock>
                <label>Qo'shimcha istaklar (Ixtiyoriy)</label>
                <textarea 
                  name="comment" 
                  placeholder="Xohishingiz bo'lsa yozib qoldiring..." 
                  value={formData.comment} 
                  onChange={handleInput} 
                />
              </InputBlock>
            </div>

            <Sidebar>
              <div className="sidebar-top">
                <div className="summary-head">Xulosa</div>
                <div className="row"><span>Hudud:</span><span>{selectedZone}</span></div>
                <div className="row"><span>Mehmonlar:</span><span>{formData.guests} kishi</span></div>
                <div className="row"><span>Sana:</span><span>{formData.date || '--'}</span></div>
                <div className="row"><span>Vaqt:</span><span>{formData.time || '--'}</span></div>
              </div>

              <div className="sidebar-bottom">
                <div className="note">
                  <p>Band qilish bepul. Tasdiqlash uchun xodimlarimiz 5 daqiqa ichida qo'ng'iroq qilishadi.</p>
                </div>
                <Button type="submit" className="confirm-btn">
                  Joyni band qilish
                </Button>
              </div>
            </Sidebar>
          </MainContainer>
        </form>
      </div>
      <Footer />
    </ReservedPage>
  );
};

export default Reserved;