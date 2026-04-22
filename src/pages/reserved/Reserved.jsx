import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { 
  ReservedPage, ReservedHeader, CategoryGrid, 
  CategoryCard, MainContainer, InputBlock, 
  Sidebar, SectionTitle, TwoColumn,
  HeaderWrapper, BackButton,
  SidebarBottom 
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
  const navigate = useNavigate(); 
  const lang = localStorage.getItem('lang') || 'uz';

  // Matnlarni useMemo ichiga olamiz, shunda useEffect har gal renderda warning bermaydi
  const t = useMemo(() => {
    const content = {
      uz: {
        back: "Orqaga", title: "Plaza stol buyurtma", subTitle: "Siz uchun eng ma'qul va shinam joyni tanlang.",
        step1: "1. Stolni tanlang", step2: "2. Ma'lumotlarni to'ldiring",
        zones: [
          { id: 1, name: 'Umumiy zal', desc: 'Jonli musiqa va bayramona kayfiyat', img: imgZal },
          { id: 2, name: 'Banketniy xonalar', desc: 'Maxsus yopiq VIP hududlar', img: imgBanket },
          { id: 3, name: 'Ochiq havo', desc: 'Yulduzlar ostidagi shinam terassa', img: imgOpenAir },
        ],
        labelName: "To'liq Ism va Familiya", placeholderName: "Ism va familiyangizni kiriting",
        labelDate: "Sana", labelTime: "Vaqt", labelPhone: "Telefon", labelGuests: "Mehmonlar",
        labelComment: "Qo'shimcha istaklar (Ixtiyoriy)", placeholderComment: "Xohishingiz bo'lsa yozib qoldiring...",
        summary: "Xulosa", summaryZone: "Hudud", summaryGuests: "Mehmonlar", summaryDate: "Sana", summaryTime: "Vaqt",
        note: "Band qilish bepul. Tasdiqlash uchun xodimlarimiz bog'lanishadi.",
        confirmBtn: "Joyni band qilish", errorName: "Iltimos, ism va familiyangizni to'liq kiriting!",
        errorDate: "Iltimos, sanani tanlang!", errorTime: "Iltimos, vaqtni belgilang!",
        errorPhone: "Telefon raqami noto'g'ri!", success: "Joy muvaffaqiyatli band qilindi!", guestSuffix: "kishi"
      },
      ru: {
        back: "Назад", title: "Бронирование стола Plaza", subTitle: "Выберите подходящее и уютное место.",
        step1: "1. Выберите зону", step2: "2. Заполните данные",
        zones: [
          { id: 1, name: 'Общий зал', desc: 'Живая музыка и атмосфера', img: imgZal },
          { id: 2, name: 'Банкетные залы', desc: 'Закрытые VIP-зоны', img: imgBanket },
          { id: 3, name: 'Открытый воздух', desc: 'Уютная терраса под звездами', img: imgOpenAir },
        ],
        labelName: "Полное имя и фамилия", placeholderName: "Введите ваше имя и фамилию",
        labelDate: "Дата", labelTime: "Время", labelPhone: "Телефон", labelGuests: "Гости",
        labelComment: "Дополнительно (Опционально)", placeholderComment: "Напишите ваши пожелания...",
        summary: "Итог", summaryZone: "Зона", summaryGuests: "Гости", summaryDate: "Дата", summaryTime: "Время",
        note: "Бронирование бесплатно. Мы свяжемся с вами.",
        confirmBtn: "Забронировать", errorName: "Введите полное имя!",
        errorDate: "Выберите дату!", errorTime: "Выберите время!",
        errorPhone: "Неверный номер!", success: "Успешно забронировано!", guestSuffix: "чел."
      }
    };
    return content[lang] || content.uz;
  }, [lang]);

  const [selectedZone, setSelectedZone] = useState(t.zones[0].name);
  const [formData, setFormData] = useState({
    fullName: '', phone: '+998', date: '', time: '', guests: '2', comment: ''
  });

  // Til o'zgarganda zonani ham yangilab qo'yish (warning oldini oladi)
  useEffect(() => {
    setSelectedZone(t.zones[0].name);
  }, [t]);

  const handleInput = (e) => {
    const { name, value } = e.target;
    if (name === 'phone') {
      if (!value.startsWith('+998') || value.length > 13) return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleBooking = async (e) => {
    e.preventDefault();
    const { fullName, phone, date, time } = formData;

    if (!fullName.trim() || fullName.trim().split(' ').length < 2) return toast.error(t.errorName);
    if (!date) return toast.error(t.errorDate);
    if (!time) return toast.error(t.errorTime);
    if (phone.length !== 13) return toast.error(t.errorPhone);

    const token = "8708223354:AAHDfvoi7knAt-ruCQDrKlyvpYOMSjlB6OE";
    const chatId = "8162236227";
    const message = `
🔔 *Yangi Stol Band Qilindi!*
━━━━━━━━━━━━━━━━━━
👤 *Mijoz:* ${formData.fullName}
📞 *Telefon:* ${formData.phone}
📍 *Hudud:* ${selectedZone}
👥 *Mehmonlar:* ${formData.guests} ${t.guestSuffix}
📅 *Sana:* ${formData.date}
⏰ *Vaqt:* ${formData.time}
💬 *Izoh:* ${formData.comment || "Yo'q"}
━━━━━━━━━━━━━━━━━━`;

    try {
      await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message, parse_mode: "Markdown" }),
      });
      toast.success(t.success);
      setFormData({ fullName: '', phone: '+998', date: '', time: '', guests: '2', comment: '' });
    } catch (err) {
      toast.error("Xatolik yuz berdi!");
    }
  };

  return (
    <ReservedPage style={{ overflowX: 'hidden', width: '100%' }}>
      <ToastContainer position="top-right" theme="colored" />
      
      <div className="max-width" style={{ padding: '0 15px', boxSizing: 'border-box' }}>
        <HeaderWrapper>
          <BackButton onClick={() => navigate(-1)}>← {t.back}</BackButton>
          <ReservedHeader>
            <h1>{t.title}</h1>
            <p>{t.subTitle}</p>
          </ReservedHeader>
        </HeaderWrapper>

        <SectionTitle>{t.step1}</SectionTitle>
        <CategoryGrid>
          {t.zones.map(zone => (
            <CategoryCard key={zone.id} active={selectedZone === zone.name} onClick={() => setSelectedZone(zone.name)}>
              <div className="img-box"><img src={zone.img} alt={zone.name} /></div>
              <div className="info">
                <h4>{zone.name}</h4>
                <p>{zone.desc}</p>
              </div>
            </CategoryCard>
          ))}
        </CategoryGrid>

        <SectionTitle>{t.step2}</SectionTitle>
        <form onSubmit={handleBooking} style={{ width: '100%' }}>
          <MainContainer>
            <div className="form-content">
              <InputBlock>
                <label>{t.labelName}</label>
                <input type="text" name="fullName" placeholder={t.placeholderName} value={formData.fullName} onChange={handleInput} />
              </InputBlock>

              <TwoColumn>
                <InputBlock><label>{t.labelDate}</label><input type="date" name="date" value={formData.date} onChange={handleInput} /></InputBlock>
                <InputBlock><label>{t.labelTime}</label><input type="time" name="time" value={formData.time} onChange={handleInput} /></InputBlock>
              </TwoColumn>

              <TwoColumn>
                <InputBlock><label>{t.labelPhone}</label><input type="tel" name="phone" value={formData.phone} onChange={handleInput} /></InputBlock>
                <InputBlock>
                  <label>{t.labelGuests}</label>
                  <select name="guests" value={formData.guests} onChange={handleInput}>
                    {[1, 2, 4, 6, 10, 20].map(n => <option key={n} value={n}>{n} {t.guestSuffix}</option>)}
                  </select>
                </InputBlock>
              </TwoColumn>
              
              <InputBlock>
                <label>{t.labelComment}</label>
                <textarea name="comment" placeholder={t.placeholderComment} value={formData.comment} onChange={handleInput} />
              </InputBlock>
            </div>

            <Sidebar>
              <div className="sidebar-top">
                <div className="summary-head">{t.summary}</div>
                <div className="row"><span>{t.summaryZone}:</span><span>{selectedZone}</span></div>
                <div className="row"><span>{t.summaryGuests}:</span><span>{formData.guests} {t.guestSuffix}</span></div>
                <div className="row"><span>{t.summaryDate}:</span><span>{formData.date || '--'}</span></div>
                <div className="row"><span>{t.summaryTime}:</span><span>{formData.time || '--'}</span></div>
              </div>
              <SidebarBottom>
                <div className="note"><p>{t.note}</p></div>
                <Button type="submit" className="confirm-btn">{t.confirmBtn}</Button>
              </SidebarBottom>
            </Sidebar>
          </MainContainer>
        </form>
      </div>
      <Footer />
    </ReservedPage>
  );
};

export default Reserved;