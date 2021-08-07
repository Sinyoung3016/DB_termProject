import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.table`
  td {
    border: 1px solid #333333;
    border-collapse: collapse;
  }
`;

const Function1 = () => {
  const [ebook, setEbook] = useState([]);
  const getfunc1 = async () => {
    const { data } = await axios.get('/api/func1');
    setEbook(data);
  }

  useEffect(() => {
    getfunc1()
  }, []);

  return (
    <Container>
      <thead>
        <tr style={{display: 'flex', columnGap: '10px', textAlign: 'center'}}>
          <td style={{width: '50px', marginLeft: '10px'}}>ISBN</td>
          <td style={{width: '400px'}}>TITLE</td>
          <td style={{width: '150px'}}>PUBLISHER</td>
          <td style={{width: '200px'}}>DATERENTED</td>
          <td style={{width: '100px'}}>CNO</td>
        </tr>
      </thead>
      <tbody>
        {ebook.map((book) => {
          return (
            <tr style={{display: 'flex', columnGap: '10px', textAlign: 'center'}} key={book[0]}>
              <td style={{width: '50px', marginLeft: '10px'}}>{book[0]}</td>
              <td style={{width: '400px'}}>{book[1]}</td>
              <td style={{width: '150px'}}>{book[2]}</td>
              <td style={{width: '200px'}}>{book[3]}</td>
              <td style={{width: '100px'}}>{book[4]}</td>
            </tr>
          );
        }
      )}
      </tbody>
    </Container>
  );
};

export default Function1;
