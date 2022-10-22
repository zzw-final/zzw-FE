import { React, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { kakaoLogoutInstance } from "../../api/request";
import { getCookie, removeAllCookies } from "../../util/cookie";
import Button from "../UI/Button";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Modal from "../UI/Modal";
import onBoarding1 from "../../assets/onBoarding1.png";
import onBoarding2 from "../../assets/onBoarding2.png";

const Logo = () => {
  const navigate = useNavigate();
  const loginUserId = getCookie("loginUserId");
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const logIn = () => {
    navigate("/login");
  };

  const logOut = () => {
    const confirm = window.confirm("로그아웃 하시겠습니까?");
    if (!confirm) return;
    console.log("loginOauth :>> ", getCookie("loginOauth"));
    if (getCookie("loginOauth") === "kakao") {
      kakaoLogoutInstance();
      removeAllCookies();
      navigate("/");
      window.location.reload();
    }
  };

  const refresh = () => window.location.reload();
  const onboarding = () => {
    setModalIsOpen(true);
  };

  return (
    <LogoContainer>
      <div onClick={refresh}>
        <LogoImg
          src="https://zzwimage.s3.ap-northeast-2.amazonaws.com/profile/noneback/7.png"
          alt="logoImg"
        />
        <LogoImg
          src="https://zzwimage.s3.ap-northeast-2.amazonaws.com/profile/noneback/8.png"
          alt="logoImg"
        />
        <LogoImg
          src="https://zzwimage.s3.ap-northeast-2.amazonaws.com/profile/noneback/9.png"
          alt="logoImg"
        />
      </div>
      <HelpIconBox onClick={onboarding}>
        <HelpOutlineIcon color="warning" />
      </HelpIconBox>
      {modalIsOpen && (
        <OnboardingBox>
          <Modal setModalIsOpen={setModalIsOpen} backgroundColor="transparent" padding="0">
            <Onboarding>
              <Swiper className="mySwiper">
                <SwiperSlide>
                  <img src={onBoarding1} alt="helpImg" />
                </SwiperSlide>
                <SwiperSlide>
                  <img src={onBoarding2} alt="helpImg" />
                </SwiperSlide>
              </Swiper>
            </Onboarding>
          </Modal>
        </OnboardingBox>
      )}
      {!loginUserId ? (
        <Button
          name="commonBtn"
          position="absolute"
          backgroundColor="transparent"
          right="0"
          margin="0rem 1.2rem"
          width="3rem"
          fontSize="var(--font-small)"
          color="var(--color-dark-orange)"
          onClick={logIn}
        >
          Log In
        </Button>
      ) : (
        <Button
          name="commonBtn"
          position="absolute"
          backgroundColor="transparent"
          right="0"
          margin="0rem 1.2rem"
          width="3.5rem"
          fontSize="var(--font-small)"
          color="var(--color-dark-orange)"
          onClick={logOut}
        >
          Log Out
        </Button>
      )}
    </LogoContainer>
  );
};

const LogoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  margin-top: 1.5rem;
`;

const HelpIconBox = styled.div`
  position: absolute;
  left: 1.4rem;
`;

const OnboardingBox = styled.div`
  height: 100%;
  z-index: 3;
`;

const Onboarding = styled.div`
  position: absolute;
  height: 70vh;
  width: 100%;
  height: 100%;

  .swiper {
    width: 100%;
    height: 100%;
  }

  .swiper-slide {
    text-align: center;
  }
`;

const LogoImg = styled.img`
  width: 4rem;
  height: 100%;
`;

export default Logo;
