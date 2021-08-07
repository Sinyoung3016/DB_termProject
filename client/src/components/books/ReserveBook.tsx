import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useLoginState } from 'contexts/LoginContext';
import Book from './book/Book';

interface Props {
  isbn: number;
  title: string;
  author: string;
  publisher: string;
  year: string;
  cno?: number; // eslint-disable-line
  extTmes?: number; // eslint-disable-line
  dateRented?: string; // eslint-disable-line
  dateDue?: string; // eslint-disable-line
  getEbook: () => void;
}

interface BProps {
  dateDue?: string;
}

const DateDue = styled.td<BProps>`
  background-color: #f0f0f8;
  height: 30px;
  margin: 0 0 0 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CancelRSV = styled.td<BProps>`
  background-color: #FFD8DF;
  &:hover {
    background-color: #FF8888;
  }
  height: 30px;
  margin: 0 0 0 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`
  
const Container = styled.tr`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;
  
const MyBookBook = ({isbn, title, author, publisher, year, cno, extTmes, dateRented, dateDue, getEbook} : Props) => {
  const loginState = useLoginState();

  // 도서 예약 취소 버튼
  const onClickCancel = async () => {
    const cno = loginState.cno; //eslint-disable-line
    if(cno !== 0 && !cno) {
      alert('## 로그인 실패');
      return;
    }
    const response = await axios.post('/api/reserveCancel', {
      data: {
        cno,
        isbn,
      }
    });
    getEbook();
    alert('해당 책의 예약을 취소합니다.');
  }

  return (
    <Container>   
      <Book isbn={isbn} title={title} author={author} publisher={publisher} year={year} />
      <DateDue>{dateDue}</DateDue>
      <CancelRSV onClick={onClickCancel}>CancelRSV</CancelRSV>
    </Container>
  );
};

export default MyBookBook;
