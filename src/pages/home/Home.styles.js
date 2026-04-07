import styled from 'styled-components'

import background from '../../assets/background.jpg';

export const HomePage = styled.div`
    background: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
    min-height: 100vh;
    width: 100%;
`;



export const HomeHeader = styled.div`

text-align: center;


img{
    max-width: 200px;
    width: 100%;

}

h1{
    font-size: 40px;
    font-weight: 500;
    margin-top: -30px;
    color: var(--white);

}
p{
    font-size: 18px;
    color: var(--white);
    margin-bottom: 30px;
}

`

export const HomeContCards = styled.div`

 /* height: 100vh; */
 display: flex;
 justify-content: center;    
 align-items: center;  
 gap: 50px;
 flex-wrap: wrap;
 padding: 20px 10px;
 
 `


export const HomeCards = styled.div`
position: relative;
background-color: var(--white);
max-width: 300px;
width: 100%;
height: 350px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.19);
border-radius: 10px;
padding: 20px;
border: none;
transition: all 0.3s ease;


&:hover{
    transform: translateY(-10px);
    box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.34);

}

img{
    position: absolute;
    top: -1px;
    left: 0px;
    right: 0px;
    width: 300px;
    height: 200px;
    background-position: center;
    background-size: cover;
    background-repeat: no-repeat;
    object-fit: cover;
    border-radius: 10px;
    border-bottom-left-radius: 0px;
    border-bottom-right-radius: 0px;
}

h2{
    position: absolute;
    bottom: 100px;
    font-size: var(--font-size-20);

}
p{
position: absolute;
bottom: 70px;
    font-size: var(--font-size-14);  
    color: #555;
}
button{
    position: absolute;
    bottom: 20px; 
    left: 20px;
    right:  20px;
}

    `   