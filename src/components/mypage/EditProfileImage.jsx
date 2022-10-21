import Button from "../UI/Button";
import styled from "styled-components";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { editApi } from "../../api/mypage";
import { options } from "../../api/options";
import { setCookie } from "../../util/cookie";

function EditProfileImage({ setModalIsOpen }) {
  const queryClient = useQueryClient();
  const [char, setChar] = useState();
  const [titleGrade, setTitleGrade] = useState();

  const { data: grades } = useQuery(
    ["mypage", "edit", "grade"],
    editApi.editGradeList,
    options.eternal
  );

  const { mutate: gradeMutate } = useMutation(() => editApi.editGrade(titleGrade), {
    onSuccess: () => {
      setCookie("loginGrade", grades.find((item) => item.gradeId === +titleGrade).gradeName);
      queryClient.invalidateQueries(["mypage", "profile"]);
    },
  });

  const { data: profileImg } = useQuery(
    ["mypage", "edit", "img"],
    editApi.editImgList,
    options.eternal
  );

  const { mutate: imgMutate } = useMutation(() => editApi.editProfileImg(char), {
    onSuccess: () => {
      setCookie("loginProfile", profileImg.find((item) => item.profileId === +char).imageUrl);
      queryClient.invalidateQueries(["mypage", "profile"]);
    },
  });

  const changeProfile = () => {
    if (char && titleGrade) {
      gradeMutate(titleGrade);
      imgMutate(char);
    } else if (char && !titleGrade) {
      imgMutate(char);
    } else if (!char && titleGrade) {
      gradeMutate(titleGrade);
    }
    setModalIsOpen(false);
  };

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
      <div style={{ textAlign: "center", marginTop: "15px" }}>
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
`;

const FlexContainer = styled.div`
  display: flex;
`;

const Title = styled.div`
  font-size: var(--font-regular);
  padding: 1rem;
  span {
    font-size: var(--font-micro);
    color: var(--color-grey);
  }
`;

const Grades = styled.div`
  height: 1.5rem;
  padding: 0px 0.5rem;
  display: flex;
  align-items: center;
  margin: 10px 0 10px 15px;
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
  text-align: center;
  width: 6rem;
  margin: 8px 7px;
  accent-color: green;
`;
