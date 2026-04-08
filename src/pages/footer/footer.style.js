import styled from "styled-components"; 

export const FooterPage = styled.div`
    min-height: 30vh;
    height: 100%;
    /* width: 100%; */
    background-color: var(--primary);   
    
    `
    export const FooterCont = styled.div`
    min-height: 30vh;
    display: flex;
    align-items: center;
    justify-content: space-around;
    gap: 50px;
    
    

   
    img{
        background-color: var(--white);
        max-width: 200px;    
        max-height: 200px;
        padding: 10px;
        border-radius: 20px;
    }
    
    h1{
        font-size: var(--font-size-40);
        font-weight: var(--font-weight-500);
        color: var(--white);

    }
    
    p{
        color: var(--white);
        font-size: var(--font-size-18);

    }

    span{
        color: var(--white);
        font-size: var(--font-size-18);
    }

    `