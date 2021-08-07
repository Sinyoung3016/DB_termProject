import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import Function1 from './Function1';
import Function2 from './Function2';
import Function3 from './Function3';

interface AdminContentProps {
  adminContent: string;
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 90vh;
  align-items: center;
  justify-content: center;
`;

const AdminContent = ({adminContent}: AdminContentProps) => {
  return (
    <Container>
		  {adminContent === '1' && <Function1 />}
      {adminContent === '2' && <Function2 />}
      {adminContent === '3' && <Function3 />}
    </Container>
  );
};

export default AdminContent;
