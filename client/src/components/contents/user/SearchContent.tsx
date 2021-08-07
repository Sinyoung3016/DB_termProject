import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SearchIcon from '@material-ui/icons/Search';
import axios from 'axios';

import { useLoginState } from 'contexts/LoginContext';
import { useInputState } from 'contexts/InputContext';
import SearchBook from '../../books/SearchBook'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const TableContainer = styled.table`
  td {
    border: 1px solid #333333;
    border-collapse: collapse;
  }
`;

const FindButton = styled.div`
  margin: 20px;
  padding: 20px;
  background-color: #e8e8e8;
  border-radius: 10px;

  &:hover {
    cursor: pointer;
    background-color: gray;
  }
`;

const SearchContent = () => {
  const loginState = useLoginState();
  const inputState = useInputState();
  const [ebook, setEbook] = useState([]);
  const [reserve, setReserve] = useState([]);
  const [reservedBook, setReservedBook] = useState([]);

  // 입력 값이 없다면 전체 도서 정렬
  const checkInput = () => {
    if (!inputState.bookTitle && !inputState.author && !inputState.publisher && !inputState.year) {
      return true;
    }
    return false;
  }

  // for 도서 대출
  const getEbook = async () => {
    const { data } = await axios.get('/api/ebook');
    setEbook(data);
  }

  // for 도서 예약
  const getReserve = async () => {
    const { data } = await axios.post('/api/getReserve', {
      data: {
        cno: loginState.cno
      }
    });
    setReserve(data);
  }

  // 검색 버튼 클릭
  const onClickSearchButton = async () => {
    if(checkInput()) {
      getEbook();
    } else {
      const { data } = await axios.post('/api/search', {
        data: {
          bookTitle: inputState.bookTitle,
          author: inputState.author,
          publisher: inputState.publisher,
          year: inputState.year,
          logic: inputState.logic,
        }
      });
      setEbook(data);
    }
  }

  useEffect(() => {
    getEbook();
    getReserve();
  }, []);

  useEffect(() => {
    let array: any = [];
    reserve.map((book) => {
      if (book[1] === loginState.cno) {
        array = array.concat(book[0]);
      }
    })
    setReservedBook(array);
  }, [reserve]);

  return (
    <Container>
      <FindButton onClick={onClickSearchButton}>
        <SearchIcon />
      </FindButton>
      <TableContainer>
        <thead>
          <tr style={{display: 'flex', columnGap: '10px', textAlign: 'center'}}>
            <td style={{width: '50px', marginLeft: '10px'}}>ISBN</td>
            <td style={{width: '400px'}}>TITLE</td>
            <td style={{width: '200px'}}>AUTHOR</td>
            <td style={{width: '150px'}}>PUBLISHER</td>
            <td style={{width: '100px'}}>YEAR</td>
            <td style={{width: '100px'}}>DATE DUE</td>
            <td style={{width: '100px'}}>RESERVE</td>
            <td style={{width: '100px'}}>RENT</td>
          </tr>
        </thead>
        <tbody>
          {ebook.map((book) => {
            return (
              <SearchBook
                key={book[0]} // eslint-disable-line
                isbn={book[0]}
                title={book[1]}
                author={book[8]}
                publisher={book[2]}
                year={book[3]}
                dateDue={book[7]}
                getEbook={getEbook}
                getReserve={getReserve}
                reservedBook={reservedBook}
              />
            );
          }
        )}
        </tbody>
      </TableContainer>
    </Container>
  );
};

export default SearchContent;
