import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

:root {
  /* Color */
  --color-white: #ffffff;
  --color-light-white: #eeeeee;
  --color-dark-white: #bdbdbd;
  --color-light-grey: #d3d3d3;
  --color-grey: #616161;
  --color-black: #000000;
  --color-sky: #279eff;
  --color-blue: #73aace;
  --color-light-blue: #D1EEFC;
  --color-light-pink: #f7c1bf;
  --color-pink: #ffa4a1;
  --color-dark-pink: #ff6863;
  --color-yellow: #fff7d1; 
  --color-light-orange: #FACE8E;
  --color-orange: #FFBB56;
  /* --color-dark-orange: #ffa113; */
  --color-dark-orange: #f4623a;
  --color-primary-green: #e8f5e9;
  --color-light-green: #dcedc8;
  --color-green: #aabb97;
  --color-dark-green: #224037;

  /* Font size */
  --font-large: 22px;
  --font-medium-large: 20px;
  --font-medium: 18px;
  --font-regular: 16px;
  --font-small: 14px;
  --font-micro: 12px;

  /* Font weight */
  --weight-bolder: 900;
  --weight-bold: 700;
  --weight-semi-bold: 600;
  --weight-regular: 400;

  /* Size */
  /* --Size-border-radius: 10px; */
}

/* Universal tags  */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
}

body{
  height: 100vh;
  width: 100vw;
}

a {
  text-decoration: none;
  color: var(--color-black);
}

ul {
  list-style: none;
}

`;

export default GlobalStyle;
