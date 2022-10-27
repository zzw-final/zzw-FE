import Button from "../UI/Button";
import styled from "styled-components";
import Spinner from "../UI/Spinner";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { editApi } from "../../api/mypage";
import { options } from "../../api/options";
import { setCookie } from "../../util/cookie";

function EditProfileImage({ setModalIsOpen }) {
  const queryClient = useQueryClient();
  const [char, setChar] = useState();
  const [titleGrade, setTitleGrade] = useState();

  const { data: profileImg, isLoading: loadingProfileImg } = useQuery(
    ["mypage", "edit", "img"],
    editApi.editImgList,
    options.eternal
  );

  const { data: grades, isLoading: loadingGrades } = useQuery(
    ["mypage", "edit", "grade"],
    editApi.editGradeList,
    options.eternal
  );

  const { mutate: profileMutate } = useMutation(() => editApi.editProfile(char, titleGrade), {
    onSuccess: () => {
      if (titleGrade)
        setCookie("loginGrade", grades.find((item) => item.gradeId === +titleGrade).gradeName);
      if (char)
        setCookie("loginProfile", profileImg.find((item) => item.profileId === +char).imageUrl);
      queryClient.invalidateQueries(["mypage", "profile"]);
    },
  });

  const changeProfile = () => {
    if (char && titleGrade) profileMutate(char, titleGrade);
    else if (!char && titleGrade) profileMutate(null, titleGrade);
    else if (char && !titleGrade) profileMutate(char, null);
    setModalIsOpen(false);
  };

  if (loadingGrades || loadingProfileImg) return <Spinner />;

  return (
    <>
      <Title>
        나의 칭호
        <span> 👇 눌러서 대표 칭호를 선택해보세요!</span>
      </Title>
      <FlexContainer>
        {grades?.map((grade) => (
          <Grades
            key={grade.gradeId}
            grade={grade}
            onClick={() => setTitleGrade(grade.gradeId)}
            titleGrade={titleGrade}
          >
            {grade.gradeName}
          </Grades>
        ))}
      </FlexContainer>
      <Title>나의 캐릭터</Title>
      <Container>
        {profileImg?.map((img) => (
          <Box key={img.profileId}>
            <Img src={img.imageUrl} alt="프로필 이미지" />
            <Radio
              type="radio"
              name="profile image"
              value={img.profileId}
              onChange={(e) => setChar(e.target.value)}
            />
          </Box>
        ))}
      </Container>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <Button onClick={changeProfile} name="DmBtn" width="45%" weight="bold">
          변경 사항 저장하기
        </Button>
      </div>
    </>
  );
}

export default EditProfileImage;

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(6rem, 1fr));
  place-items: center center;
`;

const FlexContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Title = styled.div`
  font-size: var(--font-regular);
  padding: 1rem;
  span {
    font-size: var(--font-micro);
    color: var(--color-grey);
  }
  margin: 5px 0;
`;

const Grades = styled.div`
  height: 1.5rem;
  padding: 0px 0.5rem;
  display: flex;
  align-items: center;
  margin: 0 0 5px 15px;
  background-color: ${({ grade, titleGrade }) =>
    titleGrade === grade.gradeId ? "var(--color-orange)" : "var(--color-light-white)"};
  font-size: var(--font-small);
  border-radius: 10px;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
`;

const Img = styled.img`
  width: 6rem;
  height: 6rem;
  margin: 5px 7px;
`;

const Radio = styled.input`
  width: 6rem;
  margin: 8px auto;
  accent-color: green;
`;
