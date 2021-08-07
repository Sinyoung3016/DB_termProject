import styles from 'styled-components';

import GlobalStyle from 'styles/GlobalStyle';
import Routes from 'routes/Routes';

import { LoginProvider } from 'contexts/LoginContext';
import { InputProvider } from 'contexts/InputContext';

const App = () => {

  return (
    <LoginProvider>
      <InputProvider>
        <AppContainer>
          <Routes />
          <GlobalStyle />
        </AppContainer>
      </InputProvider>
    </LoginProvider>
  );
};

const AppContainer = styles.div`
`;

export default App;
