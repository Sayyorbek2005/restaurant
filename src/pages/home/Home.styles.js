import styled from 'styled-components'
import background from '../../assets/background.jpg';

// ? style for home page
export const HomePage = styled.div`
    background: url(${background});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    object-fit: cover;
    min-height: 100vh;
    width: 100%;
`;


// ? style for home header
export const HomeHeader = styled.div`

text-align: center;


img{
    max-width: 200px;
    width: 100%;
    background-color: transparent;

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

// ? style for home cards container

export const HomeContCards = styled.div`

 /* height: 100vh; */
 display: flex;
 justify-content: center;    
 align-items: center;  
 gap: 50px;
 flex-wrap: wrap;
 padding: 20px 10px;
 
 `

// ? style for home cards

export const HomeCards = styled.div`
position: relative;
background-color: var(--white);
max-width: 300px;
width: 100%;
min-height: 400px;
height: 100%;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.19);
border-radius: 10px;
padding: 20px;
border: none;
transition: all 0.3s ease;
overflow: hidden;


&:hover{
    /* transform: translateY(-10px); */
    transform: scale(1.02);
    box-shadow: 0px 0px 15px rgba(148, 148, 148, 0.72);

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
    transition: all 0.3s ease;
}

&:hover img{
    transform: scale(1.05);  
}

h2{
    position: absolute;
    bottom: 150px;
    max-width: 250px;
    font-size: var(--font-size-20);

}
p{
    position: absolute;
    bottom: 90px;
    max-width: 250px;
    font-size: var(--font-size-14);  
    color: var(--gray);
}
button{
    position: absolute;
    bottom: 20px; 
    left: 20px;
    right:  20px;
}

    `   