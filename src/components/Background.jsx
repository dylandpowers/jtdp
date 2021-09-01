/**
 * @fileoverview A common background for a page.
 */
import React from 'react';
import styled from 'styled-components';

const BackgroundContainer = styled.div`
  background-color: #ccccff;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

export default function Background({ children }) {
  return (
    <BackgroundContainer>
      {children}
    </BackgroundContainer>
  );
}
