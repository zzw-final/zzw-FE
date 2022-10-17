import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
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
} from "./pages";
import KakaoRedirect from "./components/login/kakao/KakaoRedirect";
import GoogleRedirect from "./components/login/google/GoogleRedirect";
import SearchPage from "./pages/SearchPage";
import NaverRedirect from "./components/login/naver/NaverRedirect";
import ChatListPage from "./pages/ChatListPage";
import ErrorPage from "./pages/ErrorPage";
import { useState, useEffect } from "react";
import { getCookie } from "./util/cookie";

const Desktop = ({ children }) => {
  const isDesktop = useMediaQuery({ minWidth: 768 });
  return isDesktop ? children : null;
};

const Mobile = ({ children }) => {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return isMobile ? children : null;
};

const queryClient = new QueryClient();

// console.log("loginUserId app :>> ", getCookie("loginUserId"));
// console.log("loginNickname app :>> ", getCookie("loginNickname"));

// console.log("now!!!! >", new Date().toString());

function App() {
  const [isLogin, setIsLogin] = useState(getCookie("loginUserId") ? true : false);


  useEffect(() => {
    setTimeout(() => {
      if (getCookie("loginEmail")) setIsLogin(true);
    }, 700);
  }, []);

  // useEffect(() => {
  //   const myTimeout = setTimeout(() => {
  //     console.log(
  //       'getCookie("tokenInvalidtime")  app :>> ',
  //       getCookie("tokenInvalidtime")
  //     );
  //   }, 1000);
  //   function myStopFunction() {
  //     clearTimeout(myTimeout);
  //   }

  //   return () => {
  //     myStopFunction();
  //   };
  // }, []);

  // console.log("app 렌더링...");

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Desktop>웹사이트를 이용하려면 화면을 줄여 주세요</Desktop>
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
            <Route path="/authkakao" element={<KakaoRedirect />} />
            <Route path="/authgoogle" element={<GoogleRedirect />} />
            <Route path="/authnaver" element={<NaverRedirect />} />
            <Route path="/search" element={<SearchPage />} />
            <Route path="/chat/:roomId" element={<ChatPage />} />
            <Route path="/chatlist" element={<ChatListPage />} />
            {/* <Route path="*" element={<div>페이지를 찾을 수 없습니다.</div>} /> */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </Mobile>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
