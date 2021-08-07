import React, { ReactNode, useState } from 'react';
import styled from 'styled-components';
import moment from 'moment';
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
  extTimes?: number; // eslint-disable-line
  dateRented?: string; // eslint-disable-line
  dateDue?: string; // eslint-disable-line
  getEbook: () => void;
}

interface BProps {
  dateDue?: string;
}

const DateRented = styled.td<BProps>`
  background-color: ${(props) => (props.dateDue ? '#FFD8DF' : '#f0f0f8')};
  height: 30px;
  margin: 0 0 0 10px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const DateReturn = styled.td<BProps>`
  background-color: ${(props) => (props.dateDue ? '#FFD8DF' : '#f0f0f8')};
  height: 30px;
  margin: 0 0 0 10px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ExtTime = styled.td<BProps>`
  background-color: ${(props) => (props.dateDue ? '#FFD8DF' : '#f0f0f8')};
  &:hover {
    background-color: ${(props) => (props.dateDue ? '#FF8888' : '#f0f0f8')};
  }
  height: 30px;
  margin: 0 0 0 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const BtnExtTime = styled.td<BProps>`
  background-color: ${(props) => (props.dateDue ? '#f0f0f8' : '#FFD8DF')};
  &:hover {
   background-color: ${(props) => (props.dateDue ? '#f0f0f8' : '#FF8888')};
  }
  height: 30px;
  margin: 0 0 0 10px;
  width: 150px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Return = styled.td<BProps>`
  background-color: ${(props) => (props.dateDue ? '#f0f0f8' : '#FFD8DF')};
  &:hover {
    background-color: ${(props) => (props.dateDue ? '#f0f0f8' : '#FF8888')};
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
  
const MyBookBook = ({isbn, title, author, publisher, year, cno, extTimes, dateRented, dateDue, getEbook} : Props) => {  
  const loginState = useLoginState();

  // 도서 반환 버튼 클릭
  const onClickReturn = async () => {
    const today = moment().format('YYYYMMDD');
    const currentCno = loginState.cno; //eslint-disable-line
    if(currentCno !== 0 && !currentCno) {
      alert('## 로그인 실패');
      return;
    }
    const response = await axios.post('/api/return', {
      data: {
        dateReturned: today,
        cno,
        isbn,
      }
    });
    getEbook();
    alert('해당 책을 반납했습니다.');
  }

  // 도서 대출 연장 버튼 클릭
  const onClickExtend = async () => {
    let isReserved = false;
    const currentCno = loginState.cno; //eslint-disable-line
    if(currentCno !== 0 && !currentCno) {
      alert('## 로그인 실패');
    }

    // 해당 도서에 예약이 있으면, 연장 불가
    const { data } = await axios.get('/api/isThereReserve');
    data.map((i: any) => {
      if(i[0] === isbn) {    
        isReserved = true;
      }
    })

    if(isReserved) {
      alert('예약이 존재하므로 연장이 불가합니다.');
      return;
    }
    
    // 해당 도서 연장은 최대 두 번
    if (extTimes || extTimes === 0) {
      if (extTimes >= 2) {
        alert('연장은 최대 2번까지 가능합니다.');
        return;
      }
    
    const extendDate =  moment(dateDue).add(10, 'd').format('YYYYMMDD');
    const response = await axios.post('/api/extendtime', {
      data: {
        isbn,
        extendDate,
        extendTimes: extTimes,
      }
    });
  }
    getEbook();
    alert('해당 도서의 대출 기간을 연장했습니다.');
  }

  return (
    <Container>   
      <Book isbn={isbn} title={title} author={author} publisher={publisher} year={year} />
      <DateRented>{dateRented}</DateRented>
      <DateReturn>{dateDue}</DateReturn>
      <ExtTime>{extTimes}</ExtTime>
      <BtnExtTime onClick={onClickExtend}>EXTEND TIMES</BtnExtTime>
      <Return onClick={onClickReturn}>RETURN</Return>
    </Container>
  );
};

export default MyBookBook;
