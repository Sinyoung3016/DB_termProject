import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.table`
  td {
    border: 1px solid #333333;
    border-collapse: collapse;
  }
`;

const Function2 = () => {
  const [ebook, setEbook] = useState([]);
  const getfunc2 = async () => {
    const { data } = await axios.get('/api/func2');
    setEbook(data);
  }

  useEffect(() => {
    getfunc2()
  }, []);

  return (
    <Container>
      <thead>
        <tr style={{display: 'flex', columnGap: '10px', textAlign: 'center'}}>
          <td style={{width: '100px', marginLeft: '10px'}}>작가 이름</td>
          <td style={{width: '100px'}}>빌린 책의 수</td>
        </tr>
      </thead>
      <tbody>
        {ebook.map((book) => {
          return (
            <tr style={{display: 'flex', columnGap: '10px', textAlign: 'center'}} key={book[0]}>
              <td style={{width: '100px', marginLeft: '10px'}}>{book[0]}</td>
              <td style={{width: '100px'}}>{book[1]}</td>
            </tr>
          );
        }
      )}
      </tbody>
    </Container>
  );
};

export default Function2;
