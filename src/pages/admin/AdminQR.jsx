import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 40px;
  text-align: center;
  background: #f9f9f9;
  min-height: 100vh;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 30px;
  margin-top: 30px;
  @media print { display: block; }
`;

const Card = styled.div`
  background: #fff;
  padding: 25px;
  border-radius: 15px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  border: 2px solid #e67e22;
  @media print { page-break-inside: avoid; margin-bottom: 40px; border: 1px solid #000; }
`;

const AdminQR = () => {
  const stollar = Array.from({ length: 15 }, (_, i) => i + 1); // 15 ta stol uchun
  const baseUrl = window.location.origin; // Saytning asosiy manzili

  return (
    <Container>
      <div className="no-print">
        <h1>Plaza QR Generator</h1>
        <p>Stollar uchun QR-kodlarni chop eting</p>
        <button 
          onClick={() => window.print()} 
          style={{padding: '10px 25px', background: '#e67e22', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '10px'}}
        >
          Printerga yuborish
        </button>
      </div>

      <Grid>
        {stollar.map(num => (
          <Card key={num}>
            <h2 style={{color: '#333', marginBottom: '15px'}}>STOL №{num}</h2>
            <QRCodeCanvas value={`${baseUrl}/?table=${num}`} size={160} level="H" includeMargin={true} />
            <p style={{marginTop: '15px', fontSize: '12px', color: '#666'}}>Skaner qiling va buyurtma bering</p>
            <strong style={{display: 'block', marginTop: '5px'}}>plazamenu.uz</strong>
          </Card>
        ))}
      </Grid>
    </Container>
  );
};

export default AdminQR;