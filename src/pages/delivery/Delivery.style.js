import styled from 'styled-components';

export const DeliveryPage = styled.div`
    min-height: 100vh;
    width: 100%;
    background-color: #fdfdfd;
    /* Butun sahifa o'ngga surilib ketmasligi uchun */
    overflow-x: hidden; 
    position: relative;
`;

export const DeliveryTitle = styled.div`
    text-align: center;   
    margin-bottom: 30px;
    padding: 0 20px;
    h1 {
        font-size: var(--font-size-40);
        font-weight: var(--font-weight-500);
        color: var(--primary);
        margin: 50px 0 10px 0;
    }
    p { font-size: var(--font-size-18); color: var(--primary); }
`;

export const DeliveryNav = styled.div`
    display: flex;   
    gap: 10px;
    padding: 10px 20px; /* Yonlaridan ozgina joy */
    
    /* Faqat mana shu qism scroll bo'lishi uchun */
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    -webkit-overflow-scrolling: touch; /* Mobilda silliq scroll */
    
    &::-webkit-scrollbar {
        display: none; /* Scrollbarni yashirish */
    }
    -ms-overflow-style: none;  
    scrollbar-width: none;  

    .nav-item {
        padding: 8px 18px;
        border: 1px solid var(--primary);
        border-radius: 8px;
        cursor: pointer;
        font-weight: var(--font-weight-500);
        transition: 0.3s;
        flex-shrink: 0; /* Elementlar qisqarib ketmasligi shart */

        &.active, &:hover { 
            background: var(--primary); 
            color: white; 
        }
    }
`;

export const CartButtonWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 20px;
    margin: 20px 0 40px 0;
    width: 100%;
    padding: 0 20px; /* Konteynerdan chiqib ketmasligi uchun */
    box-sizing: border-box;

    .cart-icon-btn { 
        background: var(--primary); 
        color: white; 
        padding: 12px 22px; 
        border-radius: 12px; 
        border: none; 
        cursor: pointer; 
        font-weight: var(--font-weight-600); 
        box-shadow: 0 4px 10px rgba(255, 77, 77, 0.2);
        white-space: nowrap;
        transition: 0.3s;
    }

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch; /* Tugmani to'liq kenglikka cho'zish */
        
        .cart-icon-btn {
            width: 100%;
            text-align: center;
            margin-top: 10px;
        }
    }
`;

export const DeliveryMenu = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 25px;
    margin-bottom: 50px;
    padding: 0 20px;
    .order-card {
        background: white;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.05);
        img { width: 100%; height: 200px; object-fit: cover; border-radius: 10px; }
        h2 { font-size: var(--font-size-20); color: var(--primary); margin: 15px 0 10px; }
        p { font-size: var(--font-size-16); color: var(--primary); margin-bottom: 15px; height: 40px; overflow: hidden; }
        .for-price-and-btn { display: flex; justify-content: space-between; align-items: center; }
        span { font-size: var(--font-size-18); color: var(--primary); font-weight: 700; }
    }
`;

export const CartModal = styled.div`
    position: fixed;
    top: 0;
    right: ${props => (props.isOpen ? '0' : '-100%')};
    width: 400px;
    height: 100vh;
    background: white;
    z-index: 1001;
    transition: 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
    padding: 25px;
    display: flex;
    flex-direction: column;
    box-shadow: -10px 0 30px rgba(0,0,0,0.1);
    @media (max-width: 768px) { width: 100%; }
    .cart-header { 
        display: flex; 
        justify-content: space-between; 
        border-bottom: 1px solid #eee; 
        padding-bottom: 15px; 
        h2 { font-weight: var(--font-weight-500); font-size: var(--font-size-20); }
        .close-btn { background: none; border: none; font-size: 30px; cursor: pointer; color: #ccc; }
    }
    .cart-items { flex: 1; overflow-y: auto; padding: 20px 0; }
`;

export const CartItemRow = styled.div`
    background: #f9f9f9;
    padding: 15px;
    border-radius: 12px;
    margin-bottom: 15px;
    .item-main { 
        display: flex; 
        justify-content: space-between; 
        font-weight: var(--font-weight-600); 
        .delete-btn { background: none; border: none; color: var(--primary); cursor: pointer; font-size: 20px; }
    }
    .item-controls { display: flex; align-items: center; gap: 15px; margin-top: 10px; }
    .qty-btn { 
        width: 30px; height: 30px; border-radius: 8px; border: 1px solid #ddd; 
        background: white; cursor: pointer; font-weight: 800;
    }
    .price-total { margin-left: auto; font-weight: 900; color: var(--primary); }
`;

export const CartFooter = styled.div`
    border-top: 1px solid #eee;
    padding-top: 20px;
    .total-row { display: flex; justify-content: space-between; font-size: var(--font-size-22); font-weight: 900; margin-bottom: 20px; }
    .submit-btn { width: 100%; padding: 15px !important; font-size: var(--font-size-18) !important; }
`;

export const CheckoutModal = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 450px;
    background: white;
    z-index: 1005;
    padding: 35px;
    border-radius: 20px;
    display: ${props => (props.isOpen ? 'block' : 'none')};
    box-shadow: 0 25px 50px rgba(0,0,0,0.25);
    @media (max-width: 500px) { width: 92%; padding: 25px; }
    h2 { text-align: center; color: var(--primary); margin-bottom: 25px; font-weight: 800; }
    .checkout-btns { 
        display: flex; gap: 10px; margin-top: 25px; 
        button { flex: 1; padding: 15px; border-radius: 10px; font-weight: var(--font-weight-600); border: none; cursor: pointer; }
        .cancel { background: #f0f0f0; color:  var(--primary); }
        .confirm { background: var(--primary); color: white; }
    }
`;

export const InputGroup = styled.div`
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-bottom: 15px;
    label { font-weight: 700; color: #333; font-size: var(--font-size-14); }
    input { 
        padding: 14px; border-radius: 10px; border: 2px solid #f1f1f1; outline: none; 
        transition: 0.3s; font-size: var(--font-size-16);
        &:focus { border-color: var(--primary); }
    }
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
    display: flex;
    align-items: center;
    gap: 12px;
    .qty-display { font-weight: 800; min-width: 25px; text-align: center; font-size: var(--font-size-18); }
`;