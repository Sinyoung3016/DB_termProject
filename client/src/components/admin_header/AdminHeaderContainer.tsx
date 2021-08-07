import React, { useState } from 'react';
import styles from 'styled-components';

interface HeaderProps {
  adminContent: string;
  setAdminContent: React.Dispatch<React.SetStateAction<string>>;
}

interface AdminHeaderProps {
  color: any;
  children?: React.ReactNode;
}

const BtnFunc = styles.button<AdminHeaderProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 200px;
  border-radius: 10px;
  margin: 0 50px 0 50px;
  color: white;
  background-color: ${(props) => (props.color ? '#20a0a0' : '#75d5d5')};
`

const BtnContainer = styles.div`
  display: flex;
`  

const Container = styles.div`
  position: sticky;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  width: 100%;
  height: 70px;
  padding: 5px 20px 5px 20px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.13), 0 3px 3px rgba(0, 0, 0, 0.13);
`;

const Header = ({adminContent, setAdminContent}: HeaderProps) => {
  const onClickFunc1 = () => {
    setAdminContent('1');
  };

  const onClickFunc2 = () => {
    setAdminContent('2');
  }

  const onClickFunc3 = () => {
    setAdminContent('3');
  }
  
  return (
    <Container>
      <BtnContainer>
        <BtnFunc color={adminContent === '1'} onClick={onClickFunc1}>Func1</BtnFunc>
        <BtnFunc color={adminContent === '2'} onClick={onClickFunc2}>Func2</BtnFunc>
        <BtnFunc color={adminContent === '3'} onClick={onClickFunc3}>Func3</BtnFunc>
      </BtnContainer>
    </Container>
  );
};

export default Header;
