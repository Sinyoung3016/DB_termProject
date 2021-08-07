import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.table`
  td {
    border: 1px solid #333333;
    border-collapse: collapse;
  }
`;

const Function3 = () => {
  const [ebook, setEbook] = useState([]);
  const getfunc3 = async () => {
    const { data } = await axios.get('/api/func3');
    setEbook(data);
  }

  useEffect(() => {
    getfunc3()
  }, []);

  return (
    <Container>
      <thead>
        <tr style={{display: 'flex', columnGap: '10px', textAlign: 'center'}}>
          <td style={{width: '100px', marginLeft: '10px'}}>회원번호</td>
          <td style={{width: '150px'}}>평균연장횟수</td>
          <td style={{width: '100px'}}>총대출횟수</td>
        </tr>
      </thead>
      <tbody>
        {ebook.map((book) => {
          return (
            <tr style={{display: 'flex', columnGap: '10px', textAlign: 'center'}} key={book[0]}>
              <td style={{width: '100px', marginLeft: '10px'}}>{book[0]}</td>
              <td style={{width: '150px'}}>{book[1]}</td>
              <td style={{width: '100px'}}>{book[2]}</td>
            </tr>
          );
        }
      )}
      </tbody>
    </Container>
  );
};

export default Function3;
