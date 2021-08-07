import React, { useState } from 'react';
import styled from 'styled-components';

import RentContent from './RentContent';
import ReserveContent from './ReserveContent';

interface Props {
  color: any;
  children?: React.ReactNode;
}

const Container = styled.div`
  display: flex;
	width: 100vw;
	height: 90vh;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ChangeReserve = styled.div<Props>`
  display: flex;
  width: 100px;
	height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.color ? '#75d5d5' : '#20a0a0')};
  border-radius: 3px;
  margin: 0 10px 0 0;
`

const ChangeRent = styled.div<Props>`
  display: flex;
  width: 100px;
  height: 30px;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => (props.color ? '#20a0a0' : '#75d5d5')};
  border-radius: 3px;
  margin: 0 10px 0 0;
`

const BtnContainer = styled.div`
  display: flex;
	width: 300px;
	height: 40px;
  flex-direction: row;
`

const MyBookContent = () => {
  const [isReserveActive, setIsReserveActive] = useState(false);
  const onClickReserve = () => {
    setIsReserveActive(true);
  }
  const onClickRent = () => {
    setIsReserveActive(false);
  }
  return (
    <Container>
      <BtnContainer>
        <ChangeRent color={isReserveActive} onClick={onClickRent}>Rent</ChangeRent>
        <ChangeReserve color={isReserveActive} onClick={onClickReserve}>Reserve</ChangeReserve>
      </BtnContainer>
			{isReserveActive ? <ReserveContent /> : <RentContent />}
    </Container>
  );
};

export default MyBookContent;
