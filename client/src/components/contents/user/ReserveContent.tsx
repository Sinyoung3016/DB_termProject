import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import { useLoginState } from 'contexts/LoginContext';
import ReserveBook from '../../books/ReserveBook';

const Container = styled.table`
  td {
    border: 1px solid #333333;
    border-collapse: collapse;
  }
`;

const SearchContent = () => {
  const loginState = useLoginState();
  const [ebook, setEbook] = useState([]);

  // 회원의 예약한 도서 반환
  const getEbook = async () => {
    const cno = loginState.cno; //eslint-disable-line
    const { data } = await axios.post('/api/reserveByCno', {
      data: {
        cno,
      }
    });
    setEbook(data);
  }

  useEffect(() => {
    getEbook();
  }, []);

  return (
    <Container>
      <thead>
        <tr style={{display: 'flex', columnGap: '10px', textAlign: 'center'}}>
          <td style={{width: '50px', marginLeft: '10px'}}>ISBN</td>
          <td style={{width: '400px'}}>TITLE</td>
          <td style={{width: '200px'}}>AUTHOR</td>
          <td style={{width: '150px'}}>PUBLISHER</td>
          <td style={{width: '100px'}}>YEAR</td>
          <td style={{width: '100px'}}>DATE DUE</td>
          <td style={{width: '100px'}}>CANCEL RSV</td>
        </tr>
      </thead>
      <tbody>
        {ebook.map((book) => {
          return (
            <ReserveBook
              key={book[0]} // eslint-disable-line
              isbn={book[0]}
              title={book[1]}
              author={book[8]}
              publisher={book[2]}
              year={book[3]}
              dateDue={book[7]}
              getEbook={getEbook}
            />
          );
        }
      )}
      </tbody>
    </Container>
  );
};

export default SearchContent;
