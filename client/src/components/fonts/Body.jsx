import React from 'react';
import styled from 'styled-components';

const Container = styled.p`
  font-size: .9rem;
  opacity: .8;
  margin: 0;
  
  & > a {
    color: ${(props) => props.theme.pmy};
    opacity: 1;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Body = ({ children, ...rest }) => (
  <Container {...rest}>
    {children}
  </Container>
);

export default Body;
