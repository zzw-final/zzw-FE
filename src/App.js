import { useMediaQuery } from "react-responsive";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClientProvider, QueryClient } from "react-query";
import {
  MainPage,
  DetailPage,
  FollowPage,
  JoinPage,
  LoginPage,
  MyPage,
  WritePage,
  UserPage,
} from "./pages";
import KakaoRedirect from "./components/login/kakao/KakaoRedirect";
import GoogleRedirect from "./components/login/google/GoogleRedirect";
import EditPage from "./pages/EditPage";
import SearchPage from "./pages/SearchPage";

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
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Desktop>웹사이트를 이용하려면 화면을 줄여 주세요</Desktop>
        <Mobile>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/Join" element={<JoinPage />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/mypage/:id" element={<UserPage />} />
            <Route path="/write" element={<WritePage />} />
            <Route path="/detail/:id" element={<DetailPage />} />
            <Route path="/follow" element={<FollowPage />} />
            <Route path="/follow/:id" element={<FollowPage />} />
            <Route path="/authkakao" element={<KakaoRedirect />} />
            <Route path="/authgoogle" element={<GoogleRedirect />} />
            <Route path="/editpage/:id" element={<EditPage />} />
            <Route path="/search" element={<SearchPage />} />
          </Routes>
        </Mobile>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
