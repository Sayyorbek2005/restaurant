import styled from 'styled-components';

// !Order page style
export const OrderPage = styled.div`
    min-height: 100vh;
    width: 100%;
    background-color: #fdfdfd;
    overflow-x: hidden; /* Sahifa o'ngga surilib ketmasligi uchun */
    position: relative;
`;

//! Order page title style
export const OrderTitle = styled.div`
    text-align: center;   
    margin-bottom: 30px;
    padding: 0 20px;
    h1 {
        font-size: var(--font-size-40);
        font-weight: var(--font-weight-500);
        color: var(--primary);
        margin: 50px 0 10px 0;
    }
    p {
        font-size: var(--font-size-18);
        color: var(--black);
        margin-bottom: 30px;
    }
`;

//! Order page navigation style (Scroll bo'ladigan qism)
export const OrderNav = styled.div`
    display: flex;   
    justify-content: flex-start;
    align-items: center;
    gap: 15px;
    
    /* Scroll mantiqi */
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    padding: 10px 0;
    
    &::-webkit-scrollbar { display: none; } /* Scrollbarni yashirish */
    -ms-overflow-style: none;
    scrollbar-width: none;

    .nav-item {
        padding: 8px 18px;
        background-color: var(--white);
        color: var(--primary);
        border: 1px solid var(--primary);
        border-radius: 8px;
        font-size: var(--font-size-18);
        cursor: pointer;
        transition: all 0.3s ease;
        flex-shrink: 0; /* Siqilib qolmasligi uchun */

        &:hover, &.active {
            background-color: var(--primary);
            color: var(--white);
        }
    }
`;

// !Cart button wrapper style (Nav va Savatni o'rab turuvchi konteyner)
export const CartButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 40px 0;
    width: 100%;
    padding: 0 20px;
    box-sizing: border-box;

    /* Savatcha tugmasi */
    .cart-icon-btn {
        flex-shrink: 0;
        background: var(--primary);
        color: var(--white);
        padding: 12px 22px;
        border-radius: 12px;
        border: none;
        cursor: pointer;
        font-weight: var(--font-weight-600);
        font-size: var(--font-size-16);
        display: flex;
        align-items: center;
        gap: 10px;
        transition: all 0.2s ease;
        box-shadow: 0 4px 10px rgba(255, 77, 77, 0.2);

        &:active { transform: scale(0.95); }
    }

    /* MOBIL VERSIYA (900px dan pastda) */
    @media (max-width: 900px) {
        flex-direction: column;
        align-items: stretch; /* Tugmani to'liq kenglikka cho'zadi */
        gap: 15px;

        .cart-icon-btn {
            width: 100%;
            justify-content: center;
        }
    }
`;

// !Order page menu style
export const OrderMenu = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
    margin-bottom: 50px;
    padding: 0 20px;

    .order-card {
        background-color: var(--white);
        border-radius: 15px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        padding: 20px;
        transition: all 0.3s ease;

        &:hover {
            transform: translateY(-5px);    
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
        }
        
        img {
            width: 100%;
            height: 200px;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 15px;
        }
        h2 {
            font-size: var(--font-size-22);
            color: var(--primary);
            margin-bottom: 10px;
        }
        p {
            font-size: var(--font-size-16);
            color: var(--black);
            margin-bottom: 15px;
            height: 40px;
            overflow: hidden;
        }
        .for-price-and-btn {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
    }
`;

// !Cart modal style
export const CartModal = styled.div`
    position: fixed;
    top: 0;
    right: ${props => (props.isOpen ? '0' : '-100%')};
    width: 400px;
    height: 100vh;
    background: white;
    z-index: 1001;
    transition: right 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    display: flex;
    flex-direction: column;
    padding: 25px;
    box-shadow: -10px 0 30px rgba(0, 0, 0, 0.1);

    @media (max-width: 768px) { width: 100%; }

    .cart-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 20px;
        border-bottom: 1px solid #eee;
        h2 { font-size: var(--font-size-22); margin: 0; font-weight: 600; }
        .close-btn { background: none; border: none; font-size: 28px; cursor: pointer; color: #ccc; }
    }

    .cart-items {
        flex: 1;
        overflow-y: auto;
        padding: 20px 0;
        &::-webkit-scrollbar { width: 4px; }
        &::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
    }
`;

// !CartItemRow
export const CartItemRow = styled.div`
    display: flex;
    flex-direction: column;
    gap: 12px;
    padding: 15px;
    background: #f9f9f9;
    border-radius: 12px;
    margin-bottom: 15px;
    border: 1px solid #f0f0f0;

    .item-main {
        display: flex;
        justify-content: space-between;
        align-items: center;
        h4 { margin: 0; font-size: var(--font-size-16); color: #222; }
        .delete-btn { background: none; border: none; color: var(--primary); cursor: pointer; font-size: 24px; }
    }

    .item-controls {
        display: flex;
        align-items: center;
        gap: 15px;
        .qty-btn {
            width: 32px; height: 32px; border-radius: 8px; border: 1px solid #ddd;
            background: white; cursor: pointer; display: flex; align-items: center; justify-content: center;
        }
        .price-total { margin-left: auto; font-weight: 800; color: #333; font-size: var(--font-size-18); }
    }
`;

export const CartFooter = styled.div`
    border-top: 1px solid #eee;
    padding-top: 20px;
    .total-row {
        display: flex;
        justify-content: space-between;
        font-size: var(--font-size-22);
        font-weight: 900;
        margin-bottom: 20px;
    }
    .submit-btn { width: 100%; }
`;

export const CartOverlay = styled.div`
    display: ${props => (props.isOpen ? 'block' : 'none')};
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(5px);
    z-index: 1000;
`;

export const CardControlWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

// ... mavjud stillaringiz

export const HeaderWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-bottom: 20px;
`;

export const BackButton = styled.button`
  position: absolute;
  left: 20px;
  top: 80%;
  background-color: var(--primary);
  border: none;
  border-radius: 8px;
  padding: 8px 20px;
  color: white;
  cursor: pointer;
  font-size: var(--font-size-14);
  font-weight: var(--font-weight-500);
  transition: all 0.2s ease;

  &:hover {
    background-color: var(--primary-hover);
  }

  @media (max-width: 768px) {
    padding: 6px 10px;
    font-size: var(--font-size-12);
  }
    @media (max-width: 480px)  {
    top: 90%;
    left: 20px;
    padding: 5px 14px;
    font-size: var(--font-size-10);
  }
`;
export const CheckoutModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: ${props => props.isOpen ? 'translate(-50%, -50%) scale(1)' : 'translate(-50%, -50%) scale(0.9)'};
  width: 90%;
  max-width: 400px;
  background: white;
  padding: 30px;
  border-radius: 20px;
  z-index: 1001;
  visibility: ${props => props.isOpen ? 'visible' : 'hidden'};
  opacity: ${props => props.isOpen ? '1' : '0'};
  transition: all 0.3s ease-in-out;
  box-shadow: 0 20px 40px rgba(0,0,0,0.2);

  h2 {
    margin-bottom: 20px;
    font-size: var(--font-size-22);
    color: #333;
    text-align: center;
  }
`;

export const InputGroup = styled.div`
  margin-bottom: 15px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: var(--font-weight-500);
    color: #555;
    font-size: var(--font-size-14);
  }

  input {
    width: 100%;
    padding: 12px 15px;
    border: 1.5px solid #eee;
    border-radius: 10px;
    outline: none;
    transition: 0.3s;
    font-size: var(--font-size-16);

    &:focus {
      border-color: var(--primary);
      background: #fffcf9;
    }
  }
`;

export const ModalButtons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 25px;

  button {
    flex: 1;
    padding: 12px;
    border-radius: 10px;
    font-weight: var(--font-weight-600);
    cursor: pointer;
    transition: 0.2s;
  }

  .cancel {
    background: #f5f5f5;
    border: none;
    color: #666;
    &:hover { background: #eee; }
  }

  .confirm {
    background: var(--primary);
    border: none;
    color: white;
    &:hover { background: var(--primary-hover); }
  }
`;