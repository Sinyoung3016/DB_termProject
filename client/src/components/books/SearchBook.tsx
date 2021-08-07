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
  extTmes?: number; // eslint-disable-line
  dateRented?: string; // eslint-disable-line
  dateDue?: string; // eslint-disable-line
  getEbook: () => void;
  getReserve: () => void;
  reservedBook: number[];
}

const ACTIVE_COLOR = '#FFD8DF';
const ACTIVE_HOVER_COLOR = '#ff6969';
const DISABLED_COLOR = 'gray';

interface BProps {
  dateDue?: string;
}

const DateDue = styled.td<BProps>`
  background-color: ${(props) => (props.dateDue ? ACTIVE_COLOR : DISABLED_COLOR)};
  height: 30px;
  margin: 0 0 0 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Reserve = styled.td<BProps>`
  background-color: ${(props) => (props.dateDue ? ACTIVE_COLOR : DISABLED_COLOR)};
  &:hover {
    background-color: ${(props) => (props.dateDue ? ACTIVE_HOVER_COLOR : DISABLED_COLOR)};
    cursor: pointer;
  }
  height: 30px;
  margin: 0 0 0 10px;
  width: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Rent = styled.td<BProps>`
  background-color: ${(props) => ((props.dateDue) ? DISABLED_COLOR : ACTIVE_COLOR)};
  &:hover {
    background-color: ${(props) => (props.dateDue ? DISABLED_COLOR : ACTIVE_HOVER_COLOR)};
    cursor: ${(props) => (props.dateDue? 'default' : 'pointer')};
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
  
const SearchBook = ({isbn, title, author, publisher, year, cno, extTmes, dateRented, dateDue, getEbook, getReserve, reservedBook,} : Props) => {
  const loginState = useLoginState();

  // 도서 대출 버튼 클릭
  const onClickRent = async () => {
    const today = moment().format('YYYYMMDD');
    const dateDue = moment().add("10","d").format('YYYYMMDD');
    const cno = loginState.cno; //eslint-disable-line
    if(cno !== 0 && !cno) {
      alert('## 로그인 실패');
      return;
    }

    // 도서 대출은 최대 3번
    const res = await axios.post('/api/getRent', {data: {cno}});
    console.log("rent", res.data)
    if (res.data.length >= 3){
      alert('대출은 3권 이하만 가능합니다.');
      return;
    }

    const response = await axios.post('/api/rent', {
      data: {
        dateRented: today,
        dateDue,
        cno,
        isbn,
      }
    });

    getEbook();
    getReserve();
    alert('해당 책을 빌렸습니다.');
  }

  // 도서 예약 버튼 클릭
    const onClickReserve = async () => {
    const dateTime = moment().format('YYYYMMDD');
    const cno = loginState.cno; //eslint-disable-line
    if(cno !== 0 && !cno) {
      alert('## 로그인 실패');
      return;
    }

    // 도서 예약은 최대 3번
    const res = await axios.post('/api/getReserve', {data: {cno}});
    if (res.data.length >= 3){
      alert('예약은 3권 이하만 가능합니다.');
      return;
    }

    // 대출 가능한 도서는 dateDue == null
    if(!dateDue) {
      alert('해당 도서를 빌릴 수 있습니다.');
      return;
    }

    const response = await axios.post('/api/reserve', {
      data: {
        dateTime,
        cno,
        isbn,
      }
    });
    getEbook();
    getReserve();

    alert('해당 책을 예약했습니다.');
  }
  
  return (
    <Container>   
      <Book isbn={isbn} title={title} author={author} publisher={publisher} year={year} />
      <DateDue dateDue={dateDue}>{dateDue || "-"}</DateDue>
      {reservedBook.includes(isbn) 
        ? <Reserve style={{backgroundColor: 'gray'}} dateDue={dateDue}>Reserved</Reserve>
        : <Reserve onClick={onClickReserve} dateDue={dateDue}>Reserve</Reserve>}
      {dateDue 
        ? <Rent dateDue={dateDue}>Rent</Rent>
        : <Rent onClick={onClickRent} dateDue={dateDue}>Rent</Rent>}
    </Container>
  );
};

export default SearchBook;
