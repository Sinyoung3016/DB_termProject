import React, {useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import styles from 'styled-components';
import logo from 'images/react.png';
import axios from 'axios';
import { useLoginDispatch } from 'contexts/LoginContext';

const LoginContainer = styles.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  align-items: center;
  margin: 100px;
`;

const Logo = styles.img`
  object-fit: contain;
  width: 100px;
  height: 100px;
  margin: 5px;
`;

const ID = styles.input`
  width: 200px;
  height: 30px;
  padding: 5px;
  background-color: #FFF8DC;
  color: olive;
  margin: 5px;
`;

const Password = styles.input`
  width: 200px;
  height: 30px;
  padding: 5px;
  background-color: #FFF8DC;
  color: olive;
  margin: 5px;
`;

const Btn = styles.div`
  display: flex;
  space-between: 10px;
`;

const BtnAdmin = styles(Link)`
  width: 200px;
  height: 30px;
  margin: 10px;
  background-color: #FFD8DF;
  text-align: center;
  padding: 7px 0 0 0;
  color: olive;
`;

const BtnUser = styles.button`
  width: 200px;
  height: 30px;
  margin: 10px;
  background-color: #FFD8DF;
  text-align: center;
  padding: 7px 0 0 0;
  color: olive;
`;

const LoginPage = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const loginDispatch = useLoginDispatch();
  const history = useHistory();

  const onChangeID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setId(event.target.value);
  }

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  }

  // 로그인 버튼 클릭
  const onClickUserButton = async () => {
    console.log(id, password);
    try {
      const { data } = await axios.post('/api/login', {
        data: {
          id,
          password,
        }
      });

      // 로그인 실패
      if(!data.length) {
        alert('존재하지 않는 회원입니다.');
        return;
      }

      const cno = data[0][0];
      const name = data[0][1];

      // 로그인 성공
      alert(`${name}님 환영합니다.`);
      loginDispatch({type: "login", cno, name})
      history.replace('/user');

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <LoginContainer>
      <Logo src={logo} />
      <ID
        value={id}
        onChange={onChangeID}
        type='text'
        placeholder='ID'
      />
      <Password
        value={password}
        onChange={onChangePassword}
        type='password'
        placeholder='password'
      />
      <Btn>
        <BtnUser onClick={onClickUserButton}>User Login</BtnUser>
        <BtnAdmin to='/admin'>Administer Login</BtnAdmin>
      </Btn>
    </LoginContainer>
  );
};

export default LoginPage;
