import axios from "axios";
import styled from "styled-components";
import Button from "../UI/Button";
import EditIcon from "@mui/icons-material/Edit";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../util/cookie";
import { withdrawal } from "../../api/mypage";

function Profile({ userData, editHandler, setModalIsOpen }) {
  const navigate = useNavigate();
  const { follow, grade, gradeList, follower, nickname, profile, postSize } = userData;

  const DeleteAccountMsg =
    "😢 정말 탈퇴하시겠어요? 작성한 글은 모두 삭제되고 복구되지 않습니다.";

  const logout = () => {
    const alert = window.confirm("로그아웃 하시겠습니까?");
    if (alert) {
      if (getCookie("loginOauth") === "kakao") {
        axios.get(`${process.env.REACT_APP_API}/api/member/kakao/logout`, {
          headers: {
            kakaoToken: getCookie("oauthToken"),
            withCredentials: true,
          },
        });
      }
      removeCookie("loginNickname");
      removeCookie("refreshToken");
      removeCookie("loginUserId");
      removeCookie("accessToken");
      removeCookie("oauthToken");
      removeCookie("loginGrade");
      removeCookie("loginProfile");
      removeCookie("loginOauth");
      removeCookie("loginEmail");
      navigate("/");
    }
  };

  const deleteAccount = async () => {
    const loginUserId = getCookie("loginUserId");
    if (loginUserId && window.confirm(DeleteAccountMsg)) {
      await withdrawal(loginUserId);
      logout();
    } else return;
  };

  return (
    <Container>
      <div>
        <TopBox>
          <div>
            <EditBox onClick={() => setModalIsOpen(true)}>
              <Img src={profile}></Img>
              <Btn>
                <EditIcon fontSize="large" sx={{ color: "orange" }} />
              </Btn>
            </EditBox>
            <NicknameBox>
              <Nickname>{nickname}</Nickname>
              <div>{grade}</div>
            </NicknameBox>
          </div>
          <div>
            <FollowBox>
              <Follow>
                <p>레시피</p>
                <Num>{postSize}</Num>
              </Follow>
              <Follow>
                <p>팔로우</p>
                <Num>{follow}</Num>
              </Follow>
              <Follow>
                <p>팔로워</p>
                <Num>{follower}</Num>
              </Follow>
            </FollowBox>
            <BottomBox>
              {gradeList?.map((grade, i) => (
                <Grades key={i}>{grade.gradeName}</Grades>
              ))}
            </BottomBox>
            <Dm>
              <Button
                onClick={editHandler}
                name="DmBtn"
                width="60%"
                background="var(--color-dark-orange)"
              >
                <span style={{ fontSize: "13px" }}>✍️</span> 프로필 저장
              </Button>
              <Button
                onClick={deleteAccount}
                name="DmBtn"
                width="40%"
                size="var(--font-semi-small)"
              >
                😢 계정 삭제
              </Button>
            </Dm>
          </div>
        </TopBox>
      </div>
    </Container>
  );
}

export default Profile;

const Container = styled.div`
  background-color: var(--color-light-orange);
  margin: auto;
  padding: 3% 2% 0 1.5%;
  width: 100%;
  height: 230px;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  align-content: space-between;
`;

const TopBox = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.8rem;
`;

const EditBox = styled.div`
  position: relative;
  text-align: center;
`;

const Img = styled.img`
  margin: 0.5rem 0.2rem;
  width: 8.2rem;
  height: 8.2rem;
  border-radius: 50%;
`;

const Btn = styled.div`
  position: absolute;
  border-radius: 50%;
  height: 91%;
  width: 100%;
  background-color: white;
  opacity: 0.8;
  top: 0.4rem;
  left: 0rem;
  padding-top: 3.3rem;
`;

const Dm = styled.div`
  display: flex;
  width: 100%;
`;

const NicknameBox = styled.div`
  text-align: center;
  padding: 0.4rem;
`;

const Nickname = styled.h3`
  font-size: var(--font-medium-large);
  margin-bottom: 5px;
`;

const FollowBox = styled.div`
  display: flex;
  width: 14.5rem;
  justify-content: space-evenly;
`;

const Follow = styled.div`
  margin-top: 6.6%;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

const Num = styled.p`
  margin-top: 2px;
  font-size: var(--font-medium);
  font-weight: var(--weight-bold);
`;

const BottomBox = styled.div`
  height: 5rem;
  display: flex;
  gap: 3px;
  overflow-y: scroll;
  flex-wrap: wrap;
  margin: 20px 0 20px 0;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Grades = styled.div`
  height: 1.5rem;
  padding: 0px 0.5rem;
  display: flex;
  align-items: center;
  background-color: var(--color-white);
  font-size: var(--font-small);
  border-radius: 10px;
`;
