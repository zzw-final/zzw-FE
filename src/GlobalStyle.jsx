import { createGlobalStyle } from "styled-components";

// function setScreenSize() {
//   let vh = window.innerHeight * 0.01;
//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// }
// setScreenSize();
// window.addEventListener("resize", setScreenSize);

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
  --color-white-orange: #faeedd;
  --color-light-orange: #ffddab;
  --color-orange: #FFBB56;
  --color-real-orange: #ffa113;
  --color-dark-orange: #ff683e;
  --color-primary-green: #e8f5e9;
  --color-light-green: #dcedc8;
  --color-green: #aabb97;
  --color-dark-green: #224037;

  /* Font size */

  --font-large: 25px; 
  --font-medium-large: 23px; 
  --font-medium: 21px; 
  --font-regular: 19px; 
  --font-small: 15px; 
  --font-micro: 13px;

  /* Font weight */
  --weight-bolder: 900;
  --weight-bold: 700;
  --weight-semi-bold: 600;
  --weight-regular-thick: 500;
  --weight-regular: 400;

  /* Size */
  /* --Size-border-radius: 10px; */
}

/* Universal tags  */
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  /* font-family: "EF_Diary"; */
  font-family: "LeeSeoyun";
}

html,
body {
  margin: 0;
  padding: 0;
}

html, body{
  height: 100vh;
  /* height: calc(var(--vh, 1vh) * 100 + 56px);; */
  /* height: calc(var(--vh, 1vh) * 100); */
  width: 100vw;
}

a {
  text-decoration: none;
  color: var(--color-black);
}

ul {
  list-style: none;
}

/* @font-face {
  font-family: "EF_Diary";
  src: url("./font/EF_Diary.ttf");
} */

@font-face { 
  font-family: 'LeeSeoyun'; 
  src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2202-2@1.0/LeeSeoyun.woff') 
  format('woff'); 
  font-weight: normal; 
  font-style: normal;
}

`;

export default GlobalStyle;
