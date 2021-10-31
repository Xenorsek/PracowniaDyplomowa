import { createGlobalStyle } from "styled-components";
export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
    margin:0;
    padding:0;
  }

  body {
    display:list-item;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    padding: 0;
    margin: 0,auto;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;
  }
  /*TOPNAVBAR*/
  .navbar {
    display: flex;
    align-items: center;
    background: rebeccapurple;
    color: white;
    font-family: Helvetica;
    font-weight: 300;
}

.navbar__title {
    margin-right: auto;
    font-size: 150%;
    padding: 12px 16px;
}

.navbar__item {
    padding: 16px 16px;
    cursor: pointer;
    vertical-align: middle;
}
  footer {
    position: absolute;
    bottom: 5%;
    left: 50%;
    transform: translateX(-50%);
  
  small {
    display: block;
  }

  button {
    display: block;
  }
  a {
    color: ${({ theme }) => theme.text};
  }
 .record-element{
   align-items:center;
   justify-content: center;
 }

  .App {
      margin:0,auto;
  }
`;