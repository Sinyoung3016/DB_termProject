import React, { ReactNode } from 'react';
import styled from 'styled-components';

interface Props {
  isbn: number;
  title: string;
  author: string;
  publisher: string;
  year: string;
}

const Isbn = styled.td`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
  background-color: #f0f0f8;
  margin: 0 0 0 10px;
`

const Title = styled.td`
  width: 400px;
  height: 30px;
  background-color: #f0f0f8;
  margin: 0 0 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Author = styled.td`
  width: 200px;
  height: 30px;
  background-color: #f0f0f8;
  margin: 0 0 0 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Publisher = styled.td`
  background-color: #f0f0f8;
  height: 30px;
  margin: 0 0 0 10px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Year =  styled.td`
  background-color: #f0f0f8;
  height: 30px;
  margin: 0 0 0 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
  
const Book = ({isbn, title, author, publisher, year}: Props) => {
  return (
    <>   
      <Isbn>{isbn}</Isbn>
      <Title>{title}</Title>
      <Author>{author}</Author>
      <Publisher>{publisher}</Publisher>
      <Year>{year}</Year>
    </>
  );
};

export default Book;
