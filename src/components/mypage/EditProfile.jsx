import styled from "styled-components";
import Button from "../UI/Button";
import EditIcon from "@mui/icons-material/Edit";
import useInput from "../../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { getCookie, removeCookie } from "../../util/cookie";
import { withdrawal } from "../../api/mypage";

function Profile({ userData, nicknameEditHandler, setModalIsOpen }) {
  const navigate = useNavigate();
  const { follow, grade, gradeList, follower, nickname, profile, postSize } = userData;
  const [newNickname, nicknameHandler] = useInput(nickname);

  const msg1 = "정말 탈퇴하시겠어요? 😢 작성한 글은 모두 삭제되고 복구되지 않습니다.";
  const msg2 = "확인을 누르시면 탈퇴가 완료됩니다. 그동안 고마웠어요! 🥹";

  const logout = () => {
    removeCookie("loginNickname");
    removeCookie("refreshToken");
    removeCookie("loginUserId");
    removeCookie("accessToken");
    removeCookie("oauthToken");
    removeCookie("loginGrade");
    removeCookie("loginProfile");
    removeCookie("loginOauth");
    removeCookie("loginEmail");
    removeCookie("tokenInvalidtime");
    navigate("/");
    window.location.reload();
  };

  const deleteAccount = async () => {
    const loginUserId = getCookie("loginUserId");
    if (loginUserId && window.confirm(msg1)) {
      if (window.confirm(msg2)) {
        await withdrawal(loginUserId);
        logout();
      }
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
              <Nickname defaultValue={nickname} onChange={nicknameHandler} maxLength="6" />
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
                <p>팔로워</p>
                <Num>{follower}</Num>
              </Follow>
              <Follow>
                <p>팔로우</p>
                <Num>{follow}</Num>
              </Follow>
            </FollowBox>
            <BottomBox>
              {gradeList?.map((grade, i) => (
                <Grades key={i}>{grade.gradeName}</Grades>
              ))}
            </BottomBox>
            <Dm>
              <Button
                onClick={() => nicknameEditHandler(newNickname)}
                name="DmBtn"
                width="70%"
                background="var(--color-dark-orange)"
              >
                <span style={{ fontSize: "13px" }}>✍️</span> 프로필 저장
              </Button>
              <Button
                onClick={deleteAccount}
                name="DmBtn"
                width="30%"
                size="var(--font-semi-small)"
              >
                회원탈퇴
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
  padding: 3% 1% 0 2px;
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
  width: 8.3rem;
  height: 8.3rem;
  border-radius: 50%;
`;

const Btn = styled.div`
  position: absolute;
  border-radius: 50%;
  height: 89%;
  width: 100%;
  background-color: #fffaf4;
  opacity: 0.85;
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
  padding: 0.3rem;
`;

const Nickname = styled.input`
  font-size: var(--font-medium);
  text-align: center;
  width: 8rem;
  margin-bottom: 5px;
`;

const FollowBox = styled.div`
  display: flex;
  width: 14rem;
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
  font-size: var(--font-medium-large);
  font-weight: var(--weight-bold);
`;

const BottomBox = styled.div`
  height: 5.5rem;
  display: flex;
  gap: 5px;
  overflow-y: scroll;
  flex-wrap: wrap;
  margin: 15px 0;
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
