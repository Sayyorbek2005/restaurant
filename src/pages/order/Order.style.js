import styled from 'styled-components'

// !Order page style
export const OrderPage = styled.div`

    min-height: 100vh;
    height: 100%;
    width: 100%;

`;

//! Order page title style

export const OrderTitle = styled.div`
    text-align: center;   
    margin-bottom: 30px;
h1{
    font-size: var(--font-size-40);
    font-weight: var(--font-weight-500);
    color: var(--primary);
    margin: 50px 0px 10px 0px;
}
p{
    font-size: var(--font-size-18);
    color: var(--black);
    margin-bottom: 30px;
}

`
//! Order page navigation style
export const OrderNav = styled.div`
    display: flex;  
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    margin: 50px 0px;

    .nav-item{
        padding: 7px 10px;
        background-color: var(--white);
        color: var(--primary);
        border: 1px solid var(--primary);
        border-radius: 5px;
        font-size: var(--font-size-18);
        cursor: pointer;
        transition: all 0.3s ease;
        &:hover{
            background-color: var(--primary);
            color: var(--white);
        }

        &.active{
            background-color: var(--primary);
            color: var(--white);
        }
    }
`
// !Order page menu style
export const OrderMenu = styled.div`
    display: flex; 
    justify-content: space-around;
    align-items: flex-start;
    gap: 20px;
    flex-wrap: wrap;
    margin-bottom: 50px;

    .order-card{
        max-width: 300px;
        width: 100%;
        background-color: var(--white);
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 20px;
        transition: all 0.3s ease;
        &:hover{
            transform: translateY(-5px);    
            box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        }
        
        img{
            width: 100%;
            min-height: 200px;
            height: 100%;
            object-fit: cover;
            border-radius: 10px;
            margin-bottom: 15px;
        }
        h2{
            font-size: var(--font-size-25);
            color: var(--primary);
            margin-bottom: 10px;
        }
        p{
            font-size: var(--font-size-16);
            color: var(--black);
            margin-bottom: 15px;
        }

        .for-price-and-btn{
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        span{
            font-size: var(--font-size-18);
            color: var(--primary);
            font-weight: var(--font-weight-400);
        }
    }
`


// !Cart modal style
export const CartModal = styled.div`
  position: fixed;
  top: 0;
  right: ${props => (props.isOpen ? '0' : '-400px')};
  width: 350px;
  height: 100vh;
  background-color: white;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);
  transition: right 0.3s ease-in-out;
  z-index: 1000;
  padding: 20px;
  display: flex;
  flex-direction: column;

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 20px;
    h2 { margin: 0; font-size: var(--font-size-20); }
    button { background: none; border: none; font-size: var(--font-size-20); cursor: pointer; }
  }

  .cart-items {
    flex: 1;
    overflow-y: auto;
  }

  .cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
    padding: 10px;
    background: #f9f9f9;
    border-radius: 8px;
    
    .item-info {
      h4 { margin: 0; font-size: var(--font-size-16); }
      span { color: #888; font-size: var(--font-size-14); }
    }
  }

  .cart-footer {
    border-top: 1px solid #eee;
    padding-top: 20px;
    .total-price {
      display: flex;
      justify-content: space-between;
      font-weight: var(--font-weight-600);
      font-size: var(--font-size-18);
      margin-bottom: 20px;
    }
  }
    position: fixed;
  top: 0;
  right: ${props => (props.isOpen ? '0' : '-100%')};
  width: 400px;
  height: 100vh;
  background: white;
  z-index: 1000;
  transition: right 0.3s ease-in-out;
  display: flex;
  flex-direction: column;
  padding: 20px;
  box-shadow: -5px 0 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    width: 100%; /* Telefonda polniy ekran */
  }

  .cart-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;

    h2 { font-size: var(--font-size-20); margin: 0; }
    .close-btn { 
      background: none; 
      border: none; 
      font-size: var(--font-size-20); 
      cursor: pointer; 
      color: #333;
    }
  }
    .submit-btn {
    width: 100%;
}
  .cart-items {
    flex: 1;
    overflow-y: auto;
    padding: 20px 0;
    /* Scrollbarni chiroyli qilish */
    &::-webkit-scrollbar { width: 4px; }
    &::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }
  }
`;

// !Cart overlay style (modal ochilganda fon qorayadi)
export const CartOverlay = styled.div`
 display: ${props => (props.isOpen ? 'block' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;

// !Cart button wrapper style
export const CartButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .cart-icon-btn {
    background: var(--primary);
    color: var(--white);
    padding: 10px 20px;
    border-radius: 8px;
    border: none;
    cursor: pointer;
    font-weight: var(--font-weight-600);
    display: flex;
    align-items: center;
    gap: 10px;
    &:hover { background: var(--primary-hover); }
  }
    display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin: 20px 0;
  width: 100%;

  /* 1. Navigatsiya qismi (chap tomon) */
  nav, .order-nav-container { 
    flex: 1;
    display: flex;
    overflow-x: auto; /* Elementlar ko'payib ketsa, scroll bo'lsin */
    white-space: nowrap;
    gap: 15px;
    
    &::-webkit-scrollbar { display: none; } /* Scrollbarni yashirish */
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  /* 2. Savatcha tugmasi (o'ng tomon) */
  .cart-icon-btn {
    flex-shrink: 0; /* Tugma aslo kichrayib qolmasligi shart */
    background: var(--primary);
    color: var(--white);
    padding: 12px 20px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    font-weight: var(--font-weight-600);
    font-size: var(--font-size-16);
    display: flex;
    align-items: center;
    gap: 8px;
    transition: all 0.2s ease;
    box-shadow: 0 4px 10px rgba(255, 77, 77, 0.2);

    &:hover {
      background: var(--primary);
      transform: translateY(-2px);
    }

    &:active {
      transform: scale(0.95);
    }
  }

  /* Mobil uchun maxsus (900px dan pastda) */


  @media (max-width: 900px) {
    flex-direction: column; /* Ustma-ust tushadi */
    align-items: flex-start; /* Chapga tekislanadi */
    gap: 15px;

    .cart-icon-btn {
      width: 100%; /* Telefonda tugma to'liq kenglikda bo'ladi */
      justify-content: center;
      padding: 14px;
    }

    /* Agar nav ham bor bo'lsa, uni to'liq kenglikka yoyamiz */
    div:first-child {
      width: 100%;
    }
  }
`;

// !CartItemRow - Savatchadagi har bir mahsulot uchun alohida qator
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
    small { color: #888; font-weight: var(--font-weight-600); }
    
    .delete-btn { 
      background: none; 
      border: none; 
      color: var(--primary); 
      cursor: pointer; 
      font-size: var(--font-size-24);
      line-height: 0;
      transition: transform 0.2s;
      &:hover { transform: scale(1.2); }
    }
  }

  .item-controls {
    display: flex;
    align-items: center;
    gap: 15px;

    .qty-btn {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      border: 1px solid #ddd;
      background: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: var(--font-size-18);
      transition: all 0.2s;
      
      &:hover { 
        background: var(--primary); 
        color: white; 
        border-color: var(--primary); 
      }
    }

    .price-total {
      margin-left: auto;
      font-weight: var(--font-weight-800);
      color: #333;
      font-size: var(--font-size-18);
    }
  }
`;

// 4. Savatchaning pastki qismi (Total narx va Buyurtma tugmasi)
export const CartFooter = styled.div`
  border-top: 1px solid #eee;
  padding-top: 20px;
  margin-top: auto;

  .total-row {
    display: flex;
    justify-content: space-between;
    font-size: var(--font-size-20);
    font-weight: var(--font-weight-900);
    margin-bottom: 20px;
    color: #222;
  }
`;
// !Cart control wrapper style
export const CardControlWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .qty-display { 
    font-weight: var(--font-weight-800); 
    min-width: 25px; 
    text-align: center;
    font-size: var(--font-size-18);
  }

  button {
    padding: 5px 12px !important;
    font-size: var(--font-size-18);
  }
`;
