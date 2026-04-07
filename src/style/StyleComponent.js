import styled from 'styled-components'

export const Title = styled.h1`
  font-size: 2rem;
    
`

export const Button = styled.button`
    padding: 7px 20px;       
    background-color: var(--primary);
    color: white;
    border: 1px solid var(--primary);
    border-radius: 5px;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-5px);
        border: 1px solid var(--white);
        
    }
`       
