import styled from 'styled-components'

export const HomePage = styled.div`

 height: 100vh;
 display: flex;
 justify-content: center;    
 align-items: center;  
 gap: 50px;
 flex-wrap: wrap;
 padding: 20px 10px;

`


export const HomeCards = styled.div`
position: relative;
max-width: 300px;
width: 100%;
height: 300px;
box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
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
`