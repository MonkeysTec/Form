import { createGlobalStyle } from 'styled-components'
import { NEUTRAL_COLORS } from '../constants/styleConstants'

const GlobalStyle = createGlobalStyle`

*, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body,html {
    font-family: 'Montserrat', sans-serif;
    height: 100%;
    width:100%;

    th {
      padding: 0px 0px 10px 0px !important;
      border-bottom: 1px solid #A0A0A0;
      vertical-align: middle;
    };
    
    td {
      padding: 15px 0px;
      border-bottom: 1px solid #A0A0A0;
      vertical-align: middle;
    }

    input {
      &:focus {
        background-color: #EEF3F5;
      }
    }
  }

  input::placeholder {
    color: ${NEUTRAL_COLORS.GRAY}
  }

  input[type=number]::-webkit-inner-spin-button { 
    -webkit-appearance: none;
    
  }
  input[type=number] { 
    -moz-appearance: textfield;
    appearance: textfield;

  }
`;

export default GlobalStyle