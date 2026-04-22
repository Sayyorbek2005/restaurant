import { HomeCards, HomeContCards, HomeHeader, HomePage } from './Home.styles';
import imgOne from '../../assets/res.jpg'
import imgTwo from '../../assets/buyurtma.avif'
import imgThree from '../../assets/yetkazish.jpeg'
import logo from '../../assets/IMG_logo.PNG'
import { Button } from '../../style/StyleComponent';

import { useNavigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const Home = () => {
  const navigation = useNavigate();
  const location = useLocation();
  const [tableId, setTableId] = useState(null);
  const [isQrOpen, setIsQrOpen] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const table = params.get('table');
    if (table) {
      setTableId(table);
      localStorage.setItem('qr_table', table);
    }
  }, [location]);

  const orderClick = () => {
    const savedTable = tableId || localStorage.getItem('qr_table');
    navigation(savedTable ? `/order?table=${savedTable}` : '/order');
  };

  return (
    <HomePage>
      {/* --- FAQAT QR LOGO UCHUN KERAKLI ANIMATSIYALAR --- */}
      <style>
        {`
          @keyframes orbit-glow {
            from { transform: rotate(0deg) translateX(12px) rotate(0deg); }
            to { transform: rotate(360deg) translateX(12px) rotate(-360deg); }
          }
          .dynamic-qr-float {
            background: rgba(0, 0, 0, 0.85);
            backdrop-filter: blur(15px);
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.4s cubic-bezier(0.19, 1, 0.22, 1);
            box-shadow: 0 15px 35px rgba(0,0,0,0.3);
          }
          .dynamic-qr-float:hover {
            width: 170px !important;
            border-radius: 20px !important;
            background: #000;
          }
          .dynamic-qr-float:hover .btn-label {
            opacity: 1 !important;
            display: block !important;
          }
          .orbit-dot {
            width: 6px; height: 6px;
            background: #e67e22;
            border-radius: 50%;
            position: absolute;
            animation: orbit-glow 3s linear infinite;
            box-shadow: 0 0 10px #e67e22;
          }
        `}
      </style>

      <div className="max-width">
        <HomeHeader>
          <img src={logo} alt="logo" />
          <h1>Plaza</h1>
          {tableId && <p style={{color: '#e67e22', fontWeight: 'bold'}}>Stol №{tableId}</p>}
          <p>Barchangizga xizmat ko`rsatishimizdan mamnunmiz..!</p>
        </HomeHeader>

        <HomeContCards>
          <HomeCards onClick={() => navigation('/reserved')}>
            <img src={imgOne} alt="res" />
            <h2>Stol band qilish</h2>
            <p>Qulay joyni oldindan band qiling.</p>
            <Button>Band qilish</Button>
          </HomeCards>
          
          <HomeCards onClick={orderClick}>
            <img src={imgTwo} alt="order" />
            <h2>Buyurtma berish</h2>
            <p>Sevimli taomingizni hoziroq buyurtma bering.</p>
            <Button>Buyurtma berish</Button>
          </HomeCards>

          <HomeCards onClick={() => navigation('/delivery')}>
            <img src={imgThree} alt="delivery" />
            <h2>Yetkazib berish</h2>
            <p>Taomingizni tez va issiq holda yetkazamiz.</p>
            <Button>Yetkazib berish</Button>
          </HomeCards>
        </HomeContCards>
      </div>

      {/* --- O'NG BURCHAKDAGI DYNAMIC ISLAND QR TUGMASI --- */}
      <div 
        onClick={() => setIsQrOpen(true)}
        className="dynamic-qr-float"
        style={{
          position: 'fixed',
          bottom: '30px',
          right: '30px', // O'ng burchakka joylandi
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          zIndex: 1000,
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5">
                <rect x="3" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="3" width="7" height="7" rx="1" />
                <rect x="14" y="14" width="7" height="7" rx="1" />
                <rect x="3" y="14" width="7" height="7" rx="1" />
            </svg>
            <span className="btn-label" style={{ 
                opacity: 0, display: 'none', color: '#fff', 
                marginLeft: '12px', fontWeight: 'bold', fontSize: '13px', letterSpacing: '0.5px'
            }}>
                GET QR
            </span>
            <div className="orbit-dot"></div>
        </div>
      </div>

      {/* --- MODAL --- */}
      {isQrOpen && (
        <div 
          onClick={() => setIsQrOpen(false)}
          style={{
            position: 'fixed', top: 0, left: 0, width: '100%', height: '100%',
            background: 'rgba(0, 0, 0, 0.5)',
            backdropFilter: 'blur(20px)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            zIndex: 2000, padding: '20px'
          }}
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            style={{
              background: '#fff',
              padding: '40px 30px',
              borderRadius: '40px',
              textAlign: 'center',
              width: '100%',
              maxWidth: '350px',
              boxShadow: '0 30px 60px rgba(0,0,0,0.2)'
            }}
          >
            <h2 style={{ fontSize: '24px', fontWeight: '900', color: '#000', marginBottom: '5px' }}>Plaza Menu</h2>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '25px' }}>Ulashish uchun skanerlang</p>
            
            <div style={{
              background: '#fff',
              padding: '15px',
              borderRadius: '25px',
              display: 'inline-block',
              boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
              border: '1px solid #f0f0f0'
            }}>
              <QRCodeCanvas 
                value={window.location.origin} 
                size={220}
                level="H"
                fgColor="#000"
              />
            </div>

            <button 
              onClick={() => setIsQrOpen(false)}
              style={{
                marginTop: '30px',
                width: '100%',
                padding: '15px',
                background: '#000',
                color: '#fff',
                border: 'none',
                borderRadius: '20px',
                fontWeight: 'bold',
                cursor: 'pointer'
              }}
            >
              Yopish
            </button>
          </div>
        </div>
      )}
    </HomePage>
  );
};

export default Home;