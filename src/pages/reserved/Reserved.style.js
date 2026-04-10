import styled from 'styled-components';

export const ReservedPage = styled.section`
  /* Pastki paddingni 0 qildik, shunda footer bilan oradagi bo'shliq yo'qoladi */
  padding: 80px 0 0 0; 
  background: #fafafa;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const ReservedHeader = styled.div`
  text-align: center;
  margin-bottom: 70px;
  h1 { font-size: var(--font-size-50); font-weight: var(--font-weight-600); color: var(--primary); } 
  p { color: #888; font-size: var(--font-size-20); margin-top: 10px; }
  @media (max-width: 500px) { h1 { font-size: var(--font-size-25); } }
`;

export const SectionTitle = styled.h3`
  font-size: var(--font-size-20);
  font-weight: var(--font-weight-800);
  margin-bottom: 30px;
  color: var(--primary);
  display: flex;
  align-items: center;
  gap: var(--gap-10);
  &::before { content: ""; width: 5px; height: 22px; background: var(--primary); border-radius: 4px; }
`;

export const CategoryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--gap-20);
  margin-bottom: 60px;
  @media (max-width: 950px) { grid-template-columns: 1fr; }
`;

export const CategoryCard = styled.div`
  background: white;
  border-radius: 24px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s ease;
  border: 4px solid ${props => (props.active ? 'var(--primary)' : 'transparent')};
  box-shadow: 0 10px 30px rgba(0,0,0,0.04);
  
  &:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }

  .img-box {
    height: 180px;
    img { width: 100%; height: 100%; object-fit: cover; }
  }

  .info {
    padding: 20px;
    h4 { font-size: var(--font-size-20); margin-bottom: 5px; color: var(--primary); }
    p { font-size: var(--font-size-15); color: #888; line-height: 1.4; }
  }
`;

export const MainContainer = styled.div`
  display: grid;
  grid-template-columns: 1.3fr 0.7fr;
  gap: 30px;
  background: white;
  padding: 40px;
  border-radius: 35px;
  box-shadow: 0 30px 60px rgba(0,0,0,0.02);
  /* Container pastdan biroz masofa saqlashi uchun */
  margin-bottom: 80px; 

  @media (max-width: 1000px) { grid-template-columns: 1fr; }
  @media (max-width: 380px) { padding: 20px; border-radius: 20px; }
`;

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--gap-10);
  margin-bottom: 20px;

  label { font-weight: var(--font-weight-700); font-size: var(--font-size-15); color: #444; text-transform: uppercase; }
  
  input, select, textarea {
    padding: 16px 20px;
    border-radius: 16px;
    border: 1px solid #eee;
    background: #f8f9fb;
    font-size: var(--font-size-16);
    transition: 0.3s;
    outline: none;
    &:focus { background: #fff; border-color: var(--primary); box-shadow: 0 8px 15px rgba(255,77,77,0.05); }
  }
  textarea { height: 100px; resize: none; }
`;

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  @media (max-width: 500px) { grid-template-columns: 1fr; }
`;

export const Sidebar = styled.div`
  background: var(--primary-hover);
  border-radius: 28px;
  padding: 35px;
  color: var(--black);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .summary-head { font-size: var(--font-size-20); color: var(--black); margin-bottom: 25px; font-weight: var(--font-weight-800); }
  
  .row {
    display: flex;
    justify-content: space-between;
    padding: 14px 0;
    border-bottom: 1px solid var(--black);
    span:first-child { color: var(--black); font-size: var(--font-size-15); }
  }

  .note {
    background: var(--primary);
    padding: 20px;
    border-radius: 18px;
    margin: 30px 0;
    p { font-size: var(--font-size-14); color: var(--black); line-height: 1.5; }
  }

  .confirm-btn {
    width: 100%;
    padding: 18px;
    font-size: var(--font-size-16);
    font-weight: var(--font-weight-700);
  }
`;