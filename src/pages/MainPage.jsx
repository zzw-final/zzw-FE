import React from "react";
import LayoutPage from "../components/common/LayoutPage";
import Logo from "../components/common/Logo";
import Main from "../components/main/Main";
import SearchForm from "../components/main/SearchForm";

const MainPage = () => {
  return (
    <LayoutPage>
      <Logo />
      <SearchForm />
      <Main />
    </LayoutPage>
  );
};

export default MainPage;
