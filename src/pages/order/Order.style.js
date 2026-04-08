import styled from 'styled-components'

export const OrderPage = styled.div`

    min-height: 100vh;
    height: 100%;
    width: 100%;

`;

// ? title

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
/* ? navigation bar */

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

