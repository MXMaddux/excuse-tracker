import React from 'react'
import styled from "styled-components";

const Footer = () => {
  return (
    <Wrapper>
    <div className="copyright">
        <p>&#169; <span>{new Date().getFullYear()}</span> MaxedOutApps</p>
        <p> All Rights Reserved</p>
    </div>
    </Wrapper>
  )
}

export default Footer

const Wrapper = styled.footer`
width: 100%;
height: 40px;
background: #fbfaf9;
border-top: 1px solid var(--clr-primary-1);
padding: 5px;

.copyright {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
}
`