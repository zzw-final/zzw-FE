import Button from "../UI/Button";
import styled from "styled-components";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { editImgList, editProfileImg } from "../../api/mypage";
import { options } from "../../api/options";

function EditProfileImage({ setModalIsOpen }) {
  const [char, setChar] = useState();
  const queryClient = useQueryClient();

  const { data: profileImg } = useQuery(
    ["mypage", "edit", "img"],
    editImgList,
    options.eternal
  );

  const { mutate } = useMutation(() => editProfileImg(char), {
    onSuccess: () => {
      queryClient.invalidateQueries(["mypage", "profile"]);
    },
  });

  const changeImg = () => {
    if (char) {
      mutate(char);
      setModalIsOpen(false);
    } else {
      setModalIsOpen(false);
    }
  };

  console.log(profileImg);

  console.log(char);

  return (
    <>
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
        <Button onClick={changeImg} name="DmBtn" width="45%" weight="bold">
          캐릭터 변경하기
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

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Img = styled.img`
  border-radius: 50%;
  width: 6rem;
  height: 6rem;
  margin: 5px 7px;
`;

const Radio = styled.input`
  width: 6rem;
  margin: 8px 7px;
  accent-color: green;
`;
