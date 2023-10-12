import React from 'react'
import { func, string } from 'prop-types';
import styled from "styled-components"
import { BsMoon, BsSun } from 'react-icons/bs';
const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  color: ${({ theme }) => theme.text};
  border-radius: 30px;
  cursor: pointer;
  font-size:0.8rem;
  padding: 0.6rem;
  }
`;
const Toggle = ({theme,  toggleTheme }) => {
    return (
        <Button style={{color:'#f3a344', backgroundColor:'transparent', border:'none', marginTop:'10px'}}
        onClick={toggleTheme} >{theme === 'light' ? <BsMoon style={{ width : "25px", height : "25px" ,fontWeight:'900'}}></BsMoon> : 
                                                            <BsSun  style={{width : "25px", height : "25px", fontWeight:'900'}}></BsSun>}</Button>
    );
};
Toggle.propTypes = {
    theme: string.isRequired,
    toggleTheme: func.isRequired,
}
export default Toggle;
