import React, {useState, useEffect} from 'react';

import { useLoginState } from 'contexts/LoginContext';
import HeaderContainer from '../components/header/HeaderContainer'
import UserContent from '../components/contents/user';

const MainPage = () => {
  const [isMyBookActive, setIsMyBookActive] = useState(false);
  const loginState = useLoginState();

  useEffect(() => {
    console.log(loginState.cno, loginState.name);
  }, []);

  return (
    <>
      <HeaderContainer
        isMyBookActive={isMyBookActive}
        setIsMyBookActive={setIsMyBookActive}
      />
      <UserContent 
        isMyBookActive={isMyBookActive}
      />
    </>
  );
};

export default MainPage;
