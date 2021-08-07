import React, { useState } from 'react';
import styled from 'styled-components';

import MyBookContent from './MyBookContent';
import SearchContent from './SearchContent';

interface UserContentProps {
  isMyBookActive: boolean;
}

const Container = styled.div`
  display: flex;
	width: 100vw;
	height: 90vh;
  align-items: center;
  justify-content: center;
`;

const UserContent = ({isMyBookActive}: UserContentProps) => {
  return (
    <Container>
			{isMyBookActive ? <MyBookContent /> : <SearchContent />}
    </Container>
  );
};

export default UserContent;
