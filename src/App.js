import { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import { getCookie } from "./util/cookie";
import styled from "styled-components";
import browserImg from "./assets/browser.png";
import LoginRedirect from "./components/login/LoginRedirect";
import {
  MainPage,
  DetailPage,
  FollowPage,
  JoinPage,
  LoginPage,
  MyPage,
  WritePage,
  UserPage,
  ChatPage,
  UserFindPage,
  SearchPage,
  ChatListPage,
  ErrorPage,
} from "./pages";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return isDesktop ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const queryClient = new QueryClient();

function App() {
  const [isLogin, setIsLogin] = useState(getCookie("loginUserId") ? true : false);

  if (process.env.NODE_ENV === "production") {
    console.log = function no_console() {};
    console.warn = function no_console() {};
    console.warn = function () {};
  }

  useEffect(() => {
    setTimeout(() => {
      if (getCookie("loginEmail")) setIsLogin(true);
    }, 700);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Desktop>
          <BrowserImg />
        </Desktop>
        <Mobile>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Join" element={<JoinPage />} />
            {isLogin ? (
              <Route path="/write" element={<WritePage />} />
            ) : (
              <Route path="/write" element={<LoginPage />} />
            )}
            {isLogin ? (
              <Route path="/mypage" element={<MyPage />} />
            ) : (
              <Route path="/mypage" element={<LoginPage />} />
            )}
            <Route path="/mypage/:id" element={<UserPage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/follow" element={<FollowPage />} />
            <Route path="/follow/:id" element={<FollowPage />} />
            <Route path="/authkakao" element={<LoginRedirect />} />
            <Route path="/authgoogle" element={<LoginRedirect />} />
            <Route path="/authnaver" element={<LoginRedirect />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chat/:roomId" element={<ChatPage />} />
            <Route path="/chatlist" element={<ChatListPage />} />
            <Route path="/finduser" element={<UserFindPage />} />
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Mobile>
      </BrowserRouter>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

const BrowserImg = styled.div`
  width: 100vw;
  height: 100vh;
  background-image: url(${browserImg});
  background-position: center;
  background-repeat: no-repeat;
  background-size: 80%;
`;

export default App;
