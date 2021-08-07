import { createGlobalStyle } from 'styled-components';
import reset from 'styled-reset';

const GlobalStyle = createGlobalStyle`
    ${reset};
    button,
    input,
    a,
    li {
        all: unset;
    };

    body {
        background-color: white;
    }
`;

export default GlobalStyle;
