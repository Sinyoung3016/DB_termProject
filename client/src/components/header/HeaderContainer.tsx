import React from 'react';
import styles from 'styled-components';

import {useInputDispatch, useInputState } from 'contexts/InputContext';

interface HeaderProps {
  isMyBookActive: boolean;
  setIsMyBookActive: React.Dispatch<React.SetStateAction<boolean>>;
}

// typescript-eslint/no-explicit-any
interface MyBookProps {
  // typescript-eslint/no-explicit-any
  color: any;
  children?: React.ReactNode;
}

// typescript-eslint/no-unused-vars 
const Mybook = styles.button<MyBookProps>` 
  border-radius: 50px;
  height: 50px;
  width: 8vw;
  text-align: center;
  background-color: ${({color}) => (color ? '#FF8888' : '#FFD8DF')};

  &:hover {
    cursor: pointer;
  }
`;

const LogicButton = styles.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3vw;
  height: 40px;
  border: 1px solid gray;
  border-radius: 5px;

  &:hover {
    cursor: pointer;
  }
`;

const SearchContainer = styles.div`
  display: flex;
  justify-content: flex-end;
`;

const Container = styles.div`
  position: sticky;
  display: flex;
  justify-content: space-between;
  align-items: center;
  top: 0;
  height: 70px;
  padding: 5px 20px 5px 20px;
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.13), 0 3px 3px rgba(0, 0, 0, 0.13);
`;

const Input = styles.input`
  border-radius: 10px;
  width: 15vw;
  height: 40px;
  background-color: #f0f0f8;
  padding-left: 10px;
  margin-right: 5px;
  border: 1px solid white;
  transition: all 0.25s ease-in;

  &:hover {
    border: 1px solid #75d5d5;
  }

  &:focus {
    border: 1px solid #75d5d5;
    background-color: white;
  }
`;

const BtnSearch = styles.div`
  display: flex;
  justify-content:center;
  align-items: center;
  border-radius: 10px;
  width: 60px;
  height: 40px;
  background-color: #FFD8DF;
  margin-right: 5px;
  border: 1px solid white;
  transition: all 0.25s ease-in;

  &:hover {
    background-color: #FF8888;
  }
`;

const Header = ({isMyBookActive, setIsMyBookActive}: HeaderProps) => {
  const inputDispatch = useInputDispatch();
  const inputState = useInputState();

  const onClickMyBook = () => {
    setIsMyBookActive(true);
  };

  const onClickBtnSearch = () => {
    setIsMyBookActive(false);
  }

  const onChangeBookTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDispatch({type: 'bookTitleChange', bookTitle: e.target.value});
  }

  const onChangeAuthor = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDispatch({type: 'authorChange', author: e.target.value});
  }

  const onChangePublisher = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDispatch({type: 'publisherChange', publisher: e.target.value});
  }

  const onChangeYear = (e: React.ChangeEvent<HTMLInputElement>) => {
    inputDispatch({type: 'yearChange', year: e.target.value});
  }

  const onChangeLogic = () => {
    if (inputState.logic === 'and') {
      inputDispatch({type: 'logicChange', logic: 'or'});
    } else {
      inputDispatch({type: 'logicChange', logic: 'and'});
    }
  }

  return (
    <Container>
      <Mybook color={isMyBookActive} onClick={onClickMyBook}>My Book</Mybook>
      <SearchContainer>
        <LogicButton onClick={onChangeLogic}>{inputState.logic}</LogicButton>
        <Input onChange={onChangeBookTitle} value={inputState.bookTitle} placeholder="Book Title" />
        <Input onChange={onChangeAuthor} value={inputState.author} placeholder="Author" />
        <Input onChange={onChangePublisher} value={inputState.publisher} placeholder="Publisher" />
        <Input onChange={onChangeYear} value={inputState.year} placeholder="Year" />
        <BtnSearch onClick={onClickBtnSearch}>Search</BtnSearch>
      </SearchContainer>
    </Container>
  );
};

export default Header;
