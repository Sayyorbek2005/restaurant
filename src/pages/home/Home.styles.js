import styled from 'styled-components'

export const HomePage = styled.div`

background-color: #faac2466;
 min-height: 100vh;
 height: 100%;

`

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

}
p{
    font-size: 18px;
    color: #555;
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
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
border-radius: 10px;
padding: 20px;


img{
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    height: 200px;
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
}
button{
    position: absolute;
    bottom: 20px; 
    left: 20px;
    right:  20px;
}

    `   